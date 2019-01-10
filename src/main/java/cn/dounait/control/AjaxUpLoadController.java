package cn.dounait.control;

import cn.dounait.service.FileSaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class AjaxUpLoadController {
    @Autowired
    private FileSaveService fss;

    @RequestMapping("ajaxupload")
    public void upload(@RequestParam MultipartFile files[]){
        System.out.println(files.length);
        if(files.length != 0)
            for(MultipartFile file:files) fss.fileSava(file);
    }
}
