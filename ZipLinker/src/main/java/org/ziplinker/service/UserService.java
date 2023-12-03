package org.ziplinker.service;

import org.ziplinker.model.User;

import java.sql.*;

public class UserService {

    private final Connection connection; // Dummy for actual DB connection later.

    public UserService(Connection connection) {
        this.connection = connection;
    }

    public User register(String email, String name, String password) throws SQLException {
        // Logic to insert a new user into the `users` table.
        // This is a simplified version without proper exception handling and secure password storage.
        String sql = "INSERT INTO users (email, password, tier) VALUES (?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, email);
            statement.setString(2, password); // Password should be hashed with a salt
            statement.setInt(3, 1); // Setting 1 as the default tier for new users

            int affectedRows = statement.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Creating user failed, no rows affected.");
            }

            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    return new User(
                            generatedKeys.getInt(1),
                            email,
                            password,
                            1, // tier
                            null, // tier_expire, null for no expiration as it is free tier
                            0.0, // credit
                            0    // url_num
                    );
                } else {
                    throw new SQLException("Creating user failed, no ID obtained.");
                }
            }
        }
    }

    public User login(String email, String password) throws SQLException {
        String sql = "SELECT user_id, email, tier, tier_expire, credit, url_num FROM users WHERE email = ? AND password = ?"; // Password will be hashed in real application
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, email);
            statement.setString(2, password); // In real-world apps, hash the password before checking

            try (ResultSet resultSet = statement.executeQuery()) {
                if (!resultSet.next()) {
                    return null; // User not found or password does not match
                } else {
                    int user_id = resultSet.getInt("user_id");
                    int tier = resultSet.getInt("tier");
                    Date tier_expire = tier == 1 ? null : resultSet.getDate("tier_expire"); // Set to null for tier 1
                    double credit = resultSet.getDouble("credit");
                    int url_num = resultSet.getInt("url_num");

                    // Encapsulate the user information after a successful login attempt
                    // This object can be used throughout the session to maintain state and control access to various features based on the user's tier
                    // Return a new User object with the retrieved data
                    return new User(user_id, email, null, tier, tier_expire, credit, url_num);
                }
            }
        }
    }
}
