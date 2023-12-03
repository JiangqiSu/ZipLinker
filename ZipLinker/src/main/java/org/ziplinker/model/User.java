package org.ziplinker.model;


import java.sql.Date;

public class User {
    private int user_id;
    private String email;
    private String password;
    private int tier;
    private Date tier_expire;
    private double credit;
    private int url_num;

    public User(
            int user_id,
            String email,
            String password,
            int tier,
            Date tier_expire,
            double credit,
            int url_num
    ) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.tier = tier;
        this.tier_expire = tier_expire;
        this.credit = credit;
        this.url_num = url_num;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getTier() {
        return tier;
    }

    public void setTier(int tier) {
        this.tier = tier;
    }

    public Date getTier_expire() {
        return tier_expire;
    }

    public void setTier_expire(Date tier_expire) {
        this.tier_expire = tier_expire;
    }

    public double getCredit() {
        return credit;
    }

    public void setCredit(double credit) {
        this.credit = credit;
    }

    public int getUrl_num() {
        return url_num;
    }

    public void setUrl_num(int url_num) {
        this.url_num = url_num;
    }
}
