package cn.dounait.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class JurmPageController {

    @GetMapping("test")
    public String test(){
        return "fileupload-demo1";
    }
}
