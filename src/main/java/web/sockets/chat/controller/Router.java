package web.sockets.chat.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
class Router {

    @GetMapping("/")
    public ModelAndView getChatPAge()
    {
        ModelAndView mv = new ModelAndView("index.html");
        return mv;
    }
}