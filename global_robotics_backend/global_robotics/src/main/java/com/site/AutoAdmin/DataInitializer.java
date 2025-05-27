package com.site.AutoAdmin;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.site.Entity.User;
import com.site.Repo.UserRepo;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner init(UserRepo userRepo, PasswordEncoder encoder) {
        return args -> {
        	System.out.println("Running DataInitializer...");
            if (userRepo.findByRole("ADMIN") == null) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("globalrobotics.ai@gmail.com");
                admin.setContact("7756051573");
                admin.setPassword(encoder.encode("Globalai@07"));
                admin.setRole("ADMIN");
                userRepo.save(admin);
                System.out.println("Default admin user created.");
            }
        };
    }
}
