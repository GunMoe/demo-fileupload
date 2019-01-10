package cn.dounait.demofileupload;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "cn.dounait")
public class DemoFileuploadApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoFileuploadApplication.class, args);
    }

}

