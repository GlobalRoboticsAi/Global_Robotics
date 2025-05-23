package com.site.global_robotics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages= {"com.*"})
@EntityScan("com.site.Entity")
@EnableJpaRepositories("com.site.Repo")
public class GlobalRoboticsApplication {

	public static void main(String[] args) {
		SpringApplication.run(GlobalRoboticsApplication.class, args);
	}

}
