package web.sockets.chat.configuration;

import org.json.simple.JSONObject;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Async
public class Handler extends BinaryWebSocketHandler {

    List<WebSocketSession> sessions = new CopyOnWriteArrayList();



    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        JSONObject json = new JSONObject();
        json.put("id",session.getId());
        json.put("action","connection");
        System.out.println(json);
        session.sendMessage(new TextMessage(json.toJSONString()));
        System.out.println("Connected :" + sessions.size());
    }

    @Override
    @Async
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        System.out.println(message.getPayload());
        this.sessions.forEach(s -> {
            try {
                s.sendMessage(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("Closed :"+sessions.size());
    }

     @Override
     protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws Exception {
         sessions.forEach(s-> {
             try {
                 s.sendMessage(message);
             } catch (IOException e) {
                 e.printStackTrace();
             }
         });
     }

    @Override
    protected void handlePongMessage(WebSocketSession session, PongMessage message) throws Exception {
        sessions.forEach(s-> {
            try {
                s.sendMessage(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
