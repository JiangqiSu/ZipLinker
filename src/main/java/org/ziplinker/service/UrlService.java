package org.ziplinker.service;

import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigtable.admin.v2.BigtableTableAdminClient;
import com.google.cloud.bigtable.data.v2.BigtableDataClient;
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
    private String columnFamily;

    private BigtableTableAdminClient adminClient;

    public UrlService(BigtableDataClient dataClient, BigtableTableAdminClient adminClient, String tableId, String columnFamily) {

        this.dataClient = dataClient;
        this.tableId = tableId;
        this.columnFamily = columnFamily;
        this.adminClient = adminClient;
    }
    // Method to generate a short URL
    public Url generateShortUrl(int userId, String longUrl) throws Exception {
        String shortUrl = generateUniqueShortUrl(userId, longUrl);
        return createUrl(userId, longUrl, shortUrl);
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
    public List<Url> getActivity(int userId, int pageNum) throws SQLException {
        List<Url> activities = new ArrayList<>();
        // TODO: Implementation to retrieve user activity
        return activities;
    }

    // Method to generate a customized short URL
    public Url generateCustomizedUrl(int userId, String longUrl, String shortUrl) throws SQLException {
        // TODO: Check if the shortUrl already exists
        // TODO: If it does, throw an SQLException
        // TODO: If not, use the custom short URL provided
        return createUrl(userId, longUrl, shortUrl);
    }

    // Utility method to create a URL entry in the database
    private Url createUrl(int userId, String longUrl, String shortUrl) throws SQLException {
        System.out.println("\nWriting generated url to the table");

        long currentMilli = System.currentTimeMillis();
        long expireMilli = currentMilli + TimeUnit.DAYS.toMillis(14);
        // Calculate the timestamps for create_time and expire_time
        String createTime =  new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Timestamp(currentMilli));
        String expireTime = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").
                format(new Timestamp(expireMilli));

        // Execute the SQL statement and retrieve the generated keys (i.e., the primary key for the new record)
        try  {
            RowMutation rowMutation =
                    RowMutation.create(tableId, shortUrl)
                            .setCell(columnFamily, "userId", String.valueOf(userId))
                            .setCell(columnFamily, "longUrl", longUrl)
                            .setCell(columnFamily,"shortUrl", shortUrl)
                            .setCell(columnFamily,"createTime", createTime)
                            .setCell(columnFamily,"expireTime", expireTime);
            dataClient.mutateRow(rowMutation);
        } catch (NotFoundException e) {
            System.err.println("Failed to write to non-existent table: " + e.getMessage());
        }

        return new Url(
                userId,
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
    private String generateUniqueShortUrl(int user_id, String url) {
        String time =  new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").
                            format(new Timestamp(System.currentTimeMillis()));;
        return getMd5(url, time, user_id);
    }
    private String getMd5(String url, String timestamp, int user_id)
    {
        try {
            // Static getInstance method is called with hashing MD5
            MessageDigest md = MessageDigest.getInstance("MD5");

            // digest() method is called to calculate message digest
            // of an input digest() return array of byte
            String encodeString = url+timestamp+user_id;
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
