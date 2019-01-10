package cn.dounait.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ajaxUpLoad {

    @RequestMapping("ajaxupload")
    public String upload(@RequestParam MultipartFile file[]){
        System.out.println(file.length);
        System.out.println(file);
        return "test";
    }
}
