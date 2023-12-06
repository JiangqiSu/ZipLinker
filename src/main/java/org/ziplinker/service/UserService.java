package org.ziplinker.service;

import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigtable.admin.v2.BigtableTableAdminClient;
import com.google.cloud.bigtable.data.v2.BigtableDataClient;
import com.google.cloud.bigtable.data.v2.models.Row;
import com.google.cloud.bigtable.data.v2.models.RowCell;
import com.google.cloud.bigtable.data.v2.models.RowMutation;
import org.ziplinker.model.User;

import java.sql.*;

public class UserService {


    private BigtableDataClient dataClient;
    private String tableId;
    private String columnFamily;

    private  BigtableTableAdminClient adminClient;


    public UserService(BigtableDataClient dataClient, BigtableTableAdminClient adminClient, String tableId, String columnFamily) {

        this.dataClient = dataClient;
        this.tableId = tableId;
        this.columnFamily = columnFamily;
        this.adminClient = adminClient;
    }

    public void delete(String email,String password) throws  Exception{
        Row row = dataClient.readRow(tableId, email);
        System.out.println(row.toString());
        int passwordStored = Integer.parseInt(row.getCells(columnFamily, "password").get(0).getValue().toStringUtf8());
        System.out.println(passwordStored);
        System.out.println(password.hashCode());
        if(passwordStored != password.hashCode()){
            System.out.println("wrong password");
            return ;
        }
        else{
            this.adminClient.dropRowRange(tableId, email);
        }
    }
    public User register(String email, String name, String password) throws Exception {
        // Logic to insert a new user into the `users` table.
        // This is a simplified version without proper exception handling and secure password storage.

        //check if exists

        try {
            System.out.println("\nWriting new user to the table");
            RowMutation rowMutation =
                    RowMutation.create(tableId, email)
                            .setCell(columnFamily, "name", name)
                            .setCell(columnFamily, "password", String.valueOf(password.hashCode() ))
                            .setCell(columnFamily,"tier", String.valueOf(2))
                            .setCell(columnFamily,"tier_expire", "9999-12-31" )
                            .setCell(columnFamily,"credit", String.valueOf(50.0))
                            .setCell(columnFamily,"url_num",String.valueOf(0));
            dataClient.mutateRow(rowMutation);
            System.out.println("created user: " + email);

        } catch (NotFoundException e) {
            System.err.println("Failed to write to non-existent table: " + e.getMessage());
        }
        return new User(
               email,
                password,
                1, // tier
                null,  // tier_expire, null for no expiration as it is free tier
                0.0,   // credit
                0      // url_num
        );

    }

    public User login(String email, String password) {
        try {
            Row row = dataClient.readRow(tableId, email);
            System.out.println(row.toString());
            int passwordStored = Integer.parseInt(row.getCells(columnFamily, "password").get(0).getValue().toStringUtf8());
            System.out.println(passwordStored);
            System.out.println(password.hashCode());
            if(passwordStored != password.hashCode()){
                System.out.println("wrong password");
                return null;
            }
            return new User( email, null
                    , Integer.parseInt(row.getCells(columnFamily, "tier").get(0).getValue().toStringUtf8())
                    , Date.valueOf(row.getCells(columnFamily, "tier_expire").get(0).getValue().toStringUtf8())
                    , Double.parseDouble(row.getCells(columnFamily, "credit").get(0).getValue().toStringUtf8())
                    , Integer.parseInt(row.getCells(columnFamily, "url_num").get(0).getValue().toStringUtf8()));


        } catch (NotFoundException e) {
            System.err.println("Failed to read from a non-existent table: " + e.getMessage());
            return null;
        }

    }
}
