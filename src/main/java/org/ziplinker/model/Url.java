package org.ziplinker.model;

import java.util.Date;

public class Url {
    private int user_id;
    private String long_url;
    private String short_url;
    private Date create_time;
    private Date expire_time;
    private Date access_time;
    private int clicks;
    private String url_comment;

    public Url(
            int userId,
            String longUrl,
            String shortUrl,
            Date createTime,
            Date expireTime,
            Date accessTime,
            int clicks,
            String urlComment
    ) {
        this.user_id = userId;
        this.long_url = longUrl;
        this.short_url = shortUrl;
        this.create_time = createTime;
        this.expire_time = expireTime;
        this.access_time = accessTime;
        this.clicks = clicks;
        this.url_comment = urlComment;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getLong_url() {
        return long_url;
    }

    public void setLong_url(String long_url) {
        this.long_url = long_url;
    }

    public String getShort_url() {
        return short_url;
    }

    public void setShort_url(String short_url) {
        this.short_url = short_url;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public Date getExpire_time() {
        return expire_time;
    }

    public void setExpire_time(Date expire_time) {
        this.expire_time = expire_time;
    }

    public Date getAccess_time() {
        return access_time;
    }

    public void setAccess_time(Date access_time) {
        this.access_time = access_time;
    }

    public int getClicks() {
        return clicks;
    }

    public void setClicks(int clicks) {
        this.clicks = clicks;
    }

    public String getUrl_comment() {
        return url_comment;
    }

    public void setUrl_comment(String url_comment) {
        this.url_comment = url_comment;
    }
}
