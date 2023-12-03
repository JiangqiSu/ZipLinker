package org.ziplinker.controller;

import com.google.gson.Gson;
import org.ziplinker.adapter.DispatchAdapter;
import org.ziplinker.model.Url;
import org.ziplinker.model.User;

import java.sql.SQLException;
import java.util.List;

import static spark.Spark.*;

public class ZipLinkerController {

    public static void main(String[] args) {
        //reroute to 8080 port
        port(8080);
        staticFiles.location("/public");
        Gson gson = new Gson();
        DispatchAdapter adapter = new DispatchAdapter();

        /**
         * User Domain Endpoints
         */
        get("/hello", (request, response) -> {
            System.out.println("helloworld");
            response.status(200);
            return gson.toJson("hello");
        });

        post("/register", (request, response) -> {
            String email = request.queryParams("email");
            String name = request.queryParams("name");
            String password = request.queryParams("password");

            if (email == null || name == null || password == null) {
                response.status(400); // HTTP 400 Bad Request
                return gson.toJson("Missing parameters. 'email', 'name', and 'password' are required.");
            }
            System.out.println("correct format for register");
            try {
                User newUser = adapter.register(email, name, password);
                response.status(201); // HTTP 201 Created
                return gson.toJson(newUser);
            } catch (SQLException e) {
                response.status(500); // HTTP 500 Internal Server Error
                return gson.toJson("Registration failed: " + e.getMessage());
            }
        });

        post("/login", (request, response) -> {
            String email = request.queryParams("email");
            String password = request.queryParams("password");

            if (email == null || password == null) {
                response.status(400); // HTTP 400 Bad Request
                return gson.toJson("Missing parameters. 'email' and 'password' are required.");
            }

            try {
                User user = adapter.login(email, password);
                if (user != null) {
                    return gson.toJson(user);
                } else {
                    response.status(401); // HTTP 401 Unauthorized
                    return gson.toJson("Login failed: Incorrect email or password.");
                }
            } catch (SQLException e) {
                response.status(500); // HTTP 500 Internal Server Error
                return gson.toJson("Login failed: " + e.getMessage());
            }
        });

        /**
         * URL Domain Endpoints
         */
        post("/gen-short-url", (request, response) -> {
            try {
                int userId = Integer.parseInt(request.queryParams("user_id"));
                String longUrl = request.queryParams("long_url");
                Url url = adapter.generateShortUrl(userId, longUrl);
                return gson.toJson(url);
            } catch (Exception e) {
                response.status(500);
                return gson.toJson("URL Generation Failed: " + e.getMessage());
            }
        });

        post("/get-long-url", (request, response) -> {
            try {
                int userId = Integer.parseInt(request.queryParams("user_id"));
                String shortUrl = request.queryParams("short_url");
                String longUrl = adapter.getLongUrl(userId, shortUrl);
                return gson.toJson(longUrl);
            } catch (Exception e) {
                response.status(404);
                return gson.toJson("URL not found: " + e.getMessage());
            }
        });

        delete("/delete-url", (request, response) -> {
            try {
                int userId = Integer.parseInt(request.queryParams("user_id"));
                String shortUrl = request.queryParams("short_url");
                boolean isDeleted = adapter.deleteShortUrl(userId, shortUrl);
                return gson.toJson(isDeleted);
            } catch (Exception e) {
                response.status(500);
                return gson.toJson("Failed to delete URL: " + e.getMessage());
            }
        });

        post("/get-activity", (request, response) -> {
            try {
                int userId = Integer.parseInt(request.queryParams("user_id"));
                int pageNum = Integer.parseInt(request.queryParams("page_num"));
                List<Url> activities = adapter.getActivity(userId, pageNum);
                return gson.toJson(activities);
            } catch (Exception e) {
                response.status(500);
                return gson.toJson("Failed to get activity: " + e.getMessage());
            }
        });

        post("/gen-customized-url", (request, response) -> {
            try {
                int userId = Integer.parseInt(request.queryParams("user_id"));
                String longUrl = request.queryParams("long_url");
                String shortUrl = request.queryParams("short_url");
                Url url = adapter.generateCustomizedUrl(userId, longUrl, shortUrl);
                return gson.toJson(url);
            } catch (Exception e) {
                response.status(500);
                return gson.toJson("Custom URL generation failed: " + e.getMessage());
            }
        });

        /**
         * Transaction Domain Endpoints
         */
        post("/charge", (request, response) -> {
            var user_id = request.queryParams("user_id");
            var transaction_id = request.queryParams("transaction_id");
            return gson.toJson("Transaction Success/Failure Message");
        });

        post("/purchase", (request, response) -> {
            var user_id = request.queryParams("user_id");
            var tier = request.queryParams("tier");
            return gson.toJson("Purchase Success/Failure Message");
        });
    }
}