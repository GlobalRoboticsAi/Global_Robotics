package com.site.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.site.Dto.RegisterDto;
import com.site.Entity.User;
import com.site.Repo.UserRepo;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepo userRepo;
	
	   @Autowired
	    private PasswordEncoder passwordEncoder;

	@Override
	public void register(RegisterDto registerDto) {
		User user = new User();
		user.setName(registerDto.getName());
		user.setEmail(registerDto.getEmail());
		user.setContact(registerDto.getContact());
		user.setRole("USER");
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		
		userRepo.save(user);
		
	}

	@Override
	public User existsByEmail(String email) {
		return userRepo.findByEmail(email);
	}

	@Override
	public void updatePassword(String email, String newPassword) {
        User user = userRepo.findByEmail(email);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);

		
	}
}
