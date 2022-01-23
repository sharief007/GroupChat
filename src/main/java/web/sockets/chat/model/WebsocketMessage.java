package web.sockets.chat.model;

public record WebsocketMessage(
        byte[] message,
        String to,
        String from,
        String roomId,
        String messageType
) {}
