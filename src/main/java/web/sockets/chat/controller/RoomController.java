package web.sockets.chat.controller;

import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

@RestController
@RequestMapping("/api/rooms/")
public class RoomController {
    private final String separator = "$";
    private final record CreateRoomRequest(String roomName) {}

    @PostMapping("create")
    @CrossOrigin(origins = {"http://localhost:8080/"})
    public String createRoom( @RequestBody CreateRoomRequest request ) {
        String id = UUID.randomUUID().toString();
        return Base64.getEncoder().
                encodeToString((id+separator+request.roomName()).getBytes(StandardCharsets.UTF_8));
    }
}
