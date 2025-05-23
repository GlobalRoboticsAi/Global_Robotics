package com.site.Service;

import com.site.Dto.RegisterDto;
import com.site.Entity.User;

public interface UserService {

	void register(RegisterDto registerDto);

	User existsByEmail(String email);

	void updatePassword(String email, String newPassword);

}
