package web.sockets.chat.model;

import java.util.Date;

public class Message {
    String user,msg;
    Date date;

    public Message(String user, String msg) {
        this.user = user;
        this.msg = msg;
        this.date = new Date();
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Message{" +
                "user='" + user + '\'' +
                ", msg='" + msg + '\'' +
                ", date=" + date +
                '}';
    }
}
