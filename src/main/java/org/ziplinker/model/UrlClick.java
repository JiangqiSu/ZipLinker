package org.ziplinker.model;

import java.util.Date;

public class UrlClick {
    private int click_id;
    private int url_id;
    private Date create_time;

    public UrlClick(int clickId, int urlId, Date createTime) {
        this.click_id = clickId;
        this.url_id = urlId;
        this.create_time = createTime;
    }

    public int getClick_id() {
        return click_id;
    }

    public void setClick_id(int click_id) {
        this.click_id = click_id;
    }

    public int getUrl_id() {
        return url_id;
    }

    public void setUrl_id(int url_id) {
        this.url_id = url_id;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }
}
