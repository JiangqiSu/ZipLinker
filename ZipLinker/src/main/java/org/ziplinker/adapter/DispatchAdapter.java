package org.ziplinker.adapter;

import org.ziplinker.model.User;
import org.ziplinker.model.Url;
import org.ziplinker.service.UrlService;
import org.ziplinker.service.UserService;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class DispatchAdapter {

    private final UserService userService;
    private final UrlService urlService;

    public DispatchAdapter() {
        Connection connection = createDBConnection();
        this.userService = new UserService(connection);
        this.urlService = new UrlService(connection);
    }

    private Connection createDBConnection() {
        // TODO: Establish connection with DB here
        return null;
    }

    // Delegates the registration process to the UserService
    public User register(String email, String name, String password) throws SQLException {
        return userService.register(email, name, password);
    }

    // Delegates the login process to the UserService
    public User login(String email, String password) throws SQLException {
        return userService.login(email, password);
    }

    // Delegates the generation of a short URL from a long URL to the UrlService
    public Url generateShortUrl(int userId, String longUrl) throws Exception {
        return urlService.generateShortUrl(userId, longUrl);
    }

    // Delegates the retrieval of a long URL from a short URL to the UrlService
    public String getLongUrl(int userId, String shortUrl) throws Exception {
        return urlService.getLongUrl(userId, shortUrl);
    }

    // Delegates the deletion of a short URL to the UrlService
    public boolean deleteShortUrl(int userId, String shortUrl) throws Exception {
        return urlService.deleteShortUrl(userId, shortUrl);
    }

    // Delegates the retrieval of URL activity to the UrlService
    public List<Url> getActivity(int userId, int pageNum) throws Exception {
        return urlService.getActivity(userId, pageNum);
    }

    // Delegates the generation of a customized short URL to the UrlService
    public Url generateCustomizedUrl(int userId, String longUrl, String shortUrl) throws Exception {
        return urlService.generateCustomizedUrl(userId, longUrl, shortUrl);
    }
}

