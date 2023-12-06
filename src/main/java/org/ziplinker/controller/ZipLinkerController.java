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
        final DispatchAdapter adapter;
        try{
            adapter = new DispatchAdapter();
        }catch (Exception e){
            System.out.println("error registering adapter: "+e.getMessage());
            return;
        }

        // Set up CORS
        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

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

        post("/delete-user", (request, response) -> {
            String email = request.queryParams("email");
            String password = request.queryParams("password");

            try {
                adapter.userDelete(email,password);
                response.status(201); // HTTP 401 Unauthorized
                return gson.toJson("user deleted");

            } catch (Exception e) {
                response.status(500); // HTTP 500 Internal Server Error
                return gson.toJson("user delete failed: " + e.getMessage());
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
            } catch (Exception e) {
                response.status(500); // HTTP 500 Internal Server Error
                return gson.toJson("Login failed: " + e.getMessage());
            }
        });

        /**
         * URL Domain Endpoints
         */
        post("/gen-short-url", (request, response) -> {
            try {
                String email = request.queryParams("email");
                String longUrl = request.queryParams("long_url");
                Url url = adapter.generateShortUrl(email, longUrl);
                return gson.toJson(url);
            } catch (Exception e) {
                response.status(500);
                return gson.toJson("URL Generation Failed: " + e.getMessage());
            }
        });

        get("/get-long-url", (request, response) -> {
            try {
                String shortUrl = request.queryParams("short_url");
                String longUrl = adapter.getLongUrl(shortUrl);

                if(longUrl != null)
                    response.redirect(longUrl);

                return gson.toJson("Short URL not found: " + shortUrl);
                
            } catch (Exception e) {
                response.status(404);
                return gson.toJson("URL not found: " + e.getMessage());
            }
        });

        delete("/delete-url", (request, response) -> {
            try {
                String email = request.queryParams("email");
                String shortUrl = request.queryParams("short_url");
                boolean isDeleted = adapter.deleteShortUrl(email, shortUrl);
                return gson.toJson(isDeleted);
            } catch (Exception e) {
                response.status(500);
                return gson.toJson("Failed to delete URL: " + e.getMessage());
            }
        });

        post("/get-activity", (request, response) -> {
            try {
                String email = request.queryParams("email");
                int pageNum = Integer.parseInt(request.queryParams("page_num"));
                List<Url> activities = adapter.getActivity(email, pageNum);
                return gson.toJson(activities);
            } catch (Exception e) {
                response.status(500);
                return gson.toJson("Failed to get activity: " + e.getMessage());
            }
        });

        post("/gen-customized-url", (request, response) -> {
            try {
                String email = request.queryParams("email");
                String longUrl = request.queryParams("long_url");
                String shortUrl = request.queryParams("short_url");
                Url url = adapter.generateCustomizedUrl(email, longUrl, shortUrl);
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
