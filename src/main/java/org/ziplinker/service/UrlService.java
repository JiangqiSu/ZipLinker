package org.ziplinker.service;

import com.google.api.gax.rpc.NotFoundException;
import com.google.api.gax.rpc.ServerStream;
import com.google.cloud.bigtable.admin.v2.BigtableTableAdminClient;
import com.google.cloud.bigtable.data.v2.BigtableDataClient;
import com.google.cloud.bigtable.data.v2.models.Query;
import com.google.cloud.bigtable.data.v2.models.Row;
import com.google.cloud.bigtable.data.v2.models.RowMutation;
import org.ziplinker.model.Url;
import org.ziplinker.model.User;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class UrlService {
    private BigtableDataClient dataClient;
    private String tableId;

    private String relationTableID;
    private String columnFamily;

    private String relationColumnFamily;

    private BigtableTableAdminClient adminClient;

    public UrlService(BigtableDataClient dataClient, BigtableTableAdminClient adminClient, String tableId, String relationTableID, String columnFamily, String relationColumnFamily) {

        this.dataClient = dataClient;
        this.tableId = tableId;
        this.relationTableID = relationTableID;
        this.columnFamily = columnFamily;
        this.adminClient = adminClient;
        this.relationColumnFamily = relationColumnFamily;
    }
    // Method to generate a short URL
    public Url generateShortUrl(String email, String longUrl) throws Exception {
        String shortUrl = generateUniqueShortUrl(email, longUrl);
        return createUrl(email, longUrl, shortUrl);
    }

    // Method to get the long URL from a short URL
    public String getLongUrl(String shortUrl) {
        try {
            Row row = dataClient.readRow(tableId, shortUrl);
            System.out.println(row.toString());
            String longUrl = row.getCells(columnFamily, "longUrl").get(0).getValue().toStringUtf8();

            return longUrl;

        } catch (NotFoundException e) {
            System.err.println("Failed to read from a non-existent table: " + e.getMessage());
            return null;
        }
    }

    // Method to delete a short URL
    public boolean deleteShortUrl(String shortUrl) {
        this.adminClient.dropRowRange(tableId, shortUrl);

        return true;
    }

    // Method to retrieve URL activity for a user
    // use another table: team1_url_click
    public List<Url> getActivity(String email) throws SQLException {
        Query query = Query.create(relationTableID).prefix(email);
        ServerStream<Row> rows = dataClient.readRows(query);

        List<Url> activities = new ArrayList<>();
        for (Row row : rows) {
            //read row and continue in here
            String longUrl = row.getCells(relationColumnFamily, "longUrl").get(0).getValue().toStringUtf8();
            String createMilliStr = row.getCells(relationColumnFamily, "createTime").get(0).getValue().toStringUtf8();
            long createMilli =  Long.parseLong(createMilliStr);

            String expireMilliStr = row.getCells(relationColumnFamily, "expireTime").get(0).getValue().toStringUtf8();
            long expireMilli = Long.parseLong(expireMilliStr);

            String key = row.getKey().toStringUtf8();

            int emailPos = key.indexOf(email);
            String shortUrl = key.substring(emailPos+email.length()+1);

            Url url = new Url(email,
                    longUrl,
                    shortUrl,
                    new Date(createMilli),
                    new Date(expireMilli),
                    null,
                    0,
                    "");

            activities.add(url);
        }

        return activities;
    }

    // Method to generate a customized short URL
    public Url generateCustomizedUrl(String email, String longUrl, String prefix) throws SQLException {
        String shortened = generateUniqueShortUrl(email, longUrl);

        String shortWithPre = prefix + "/" + shortened;
        return createUrl(email, longUrl, shortWithPre);
    }

    // Utility method to create a URL entry in the database
    private Url createUrl(String email, String longUrl, String shortUrl) throws SQLException {
        System.out.println("\nWriting generated url to the table");

        long currentMilli = System.currentTimeMillis();
        long expireMilli = currentMilli + TimeUnit.DAYS.toMillis(14);
        // Calculate the timestamps for create_time and expire_time
//        String createTime =  new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Timestamp(currentMilli));
//        String expireTime = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").
//                format(new Timestamp(expireMilli));

        // Execute the SQL statement and retrieve the generated keys (i.e., the primary key for the new record)
        try  {
            RowMutation rowMutation =
                    RowMutation.create(tableId, shortUrl)
                            .setCell(columnFamily, "email", String.valueOf(email))
                            .setCell(columnFamily, "longUrl", longUrl)
                            .setCell(columnFamily,"shortUrl", shortUrl)
                            .setCell(columnFamily,"createTime", String.valueOf(currentMilli))
                            .setCell(columnFamily,"expireTime", String.valueOf(expireMilli));
            dataClient.mutateRow(rowMutation);
            //memorize the shortUrl user relation
            RowMutation rowMutation2 =
                    RowMutation.create(relationTableID, String.valueOf(email)+'_'+shortUrl)
                            .setCell(relationColumnFamily, "longUrl", longUrl)
                            .setCell(relationColumnFamily,"createTime", String.valueOf(currentMilli))
                            .setCell(relationColumnFamily,"expireTime", String.valueOf(expireMilli));
            dataClient.mutateRow(rowMutation2);

        } catch (NotFoundException e) {
            System.err.println("Failed to write to non-existent table: " + e.getMessage());
        }

        return new Url(
                email,
                longUrl,
                shortUrl,
                new Date(currentMilli),
                new Date(expireMilli),
                null,
                0,
                ""
        );
    }

    // Utility method to generate a unique short URL
    private String generateUniqueShortUrl(String email, String url) {
        String time =  new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").
                            format(new Timestamp(System.currentTimeMillis()));;
        return getMd5(url, time, email);
    }
    private String getMd5(String url, String timestamp, String email)
    {
        try {
            // Static getInstance method is called with hashing MD5
            MessageDigest md = MessageDigest.getInstance("MD5");

            // digest() method is called to calculate message digest
            // of an input digest() return array of byte
            String encodeString = url+timestamp+email;
            byte[] messageDigest = md.digest(encodeString.getBytes());

            // Convert byte array into signum representation
            BigInteger no = new BigInteger(1, messageDigest);
            // Convert message digest into hex value
            String hashtext = no.toString(32);
            while (hashtext.length() < 10) {
                hashtext = "0" + hashtext;
            }
            return hashtext.substring(0,10);
        }

        // For specifying wrong message digest algorithms
        catch (java.security.NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
