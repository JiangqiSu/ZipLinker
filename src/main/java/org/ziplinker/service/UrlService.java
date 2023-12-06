package org.ziplinker.service;

import org.ziplinker.model.Url;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class UrlService {

    private Connection connection;

    public UrlService(Connection connection) {
        this.connection = connection;
    }

    // Method to generate a short URL
    public Url generateShortUrl(int userId, String longUrl) throws SQLException {
        String shortUrl = generateUniqueShortUrl();
        return createUrl(userId, longUrl, shortUrl);
    }

    // Method to get the long URL from a short URL
    public String getLongUrl(int userId, String shortUrl) throws SQLException {
        String sql = "SELECT long_url FROM urls WHERE user_id = ? AND short_url = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            statement.setString(2, shortUrl);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getString("long_url");
            } else {
                throw new SQLException("Long URL not found for the given short URL");
            }
        }
    }

    // Method to delete a short URL
    public boolean deleteShortUrl(int userId, String shortUrl) throws SQLException {
        String sql = "DELETE FROM urls WHERE user_id = ? AND short_url = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            statement.setString(2, shortUrl);
            int rowsDeleted = statement.executeUpdate();
            return rowsDeleted > 0;
        }
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
        String sql = "INSERT INTO urls (user_id, long_url, short_url, create_time, expire_time) VALUES (?, ?, ?, ?, ?)";

        // Calculate the timestamps for create_time and expire_time
        java.sql.Timestamp createTime = new java.sql.Timestamp(System.currentTimeMillis());
        java.sql.Timestamp expireTime = new java.sql.Timestamp(createTime.getTime() + TimeUnit.DAYS.toMillis(14));

        // Execute the SQL statement and retrieve the generated keys (i.e., the primary key for the new record)
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, userId);
            statement.setString(2, longUrl);
            statement.setString(3, shortUrl);
            statement.setTimestamp(4, createTime); // Explicitly set create_time
            statement.setTimestamp(5, expireTime); // Explicitly set expire_time

            int affectedRows = statement.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Creating URL failed, no rows affected.");
            }

            // Retrieve the generated ID for the new record
            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    int urlId = generatedKeys.getInt(1);

                    // Create and return the Url object with the generated ID and timestamps
                    return new Url(
                            urlId,
                            userId,
                            longUrl,
                            shortUrl,
                            createTime, // The create_time is the current timestamp
                            expireTime, // The expire_time is 14 days from the create_time
                            null,       // ACCESS_TIME will be null by default as it's not set during creation
                            0,          // CLICKS will be 0 by default
                            null        // URL_COMMENT is null by default
                    );
                } else {
                    throw new SQLException("Creating URL failed, no ID obtained.");
                }
            }
        }
    }

    // Utility method to generate a unique short URL
    private String generateUniqueShortUrl() {
        // TODO: Implementation to generate a unique short URL
        return "SomeShortURL";
    }
}
