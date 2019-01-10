package cn.dounait.service;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.UUID;
@Service
public class FileSaveService {
    public void fileSava(MultipartFile file) {
        //获取根目录
        File rootPath = null;
        try {
            rootPath = new File(ResourceUtils.getURL("").getPath());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        System.out.println("项目根路径========>>rootPath:"+rootPath.getAbsolutePath());

        //上传目录/file/获取：
        File uploadPath = new File(rootPath.getAbsolutePath(),"static/upload/");
        if(!uploadPath.exists()) uploadPath.mkdirs();
        System.out.println("保存路径========>>uploadPath:"+uploadPath);
        //在开发测试模式时，得到的地址为：{项目跟目录}/target/static/images/upload/
        //在打包成jar正式发布时，得到的地址为：{发布jar包目录}/static/images/upload/

        String uuid = UUID.randomUUID().toString();
        String oldName = file.getOriginalFilename();
        //保存到硬盘中的路径
        String savaPath = uploadPath+"/"+uuid+"-"+oldName;
        System.out.println("文件完整路径=====:"+savaPath);
        File fo = new File(savaPath);
        try {
            //将内存中的文件转移到硬盘中
            file.transferTo(fo);
            System.out.println("上传成功");
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
