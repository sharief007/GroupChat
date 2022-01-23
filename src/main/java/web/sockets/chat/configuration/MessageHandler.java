package web.sockets.chat.configuration;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MessageHandler {
    private final SimpMessagingTemplate messagingTemplate;

    public MessageHandler(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/room")
    public void handle(Message<byte[]> message) {
        System.out.println(new String(message.getPayload()));
        messagingTemplate.convertAndSend("/topic/123",new String(message.getPayload()));
    }
}
