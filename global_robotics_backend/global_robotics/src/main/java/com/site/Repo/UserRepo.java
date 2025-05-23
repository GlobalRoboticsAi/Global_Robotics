package com.site.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.site.Dto.RegisterDto;
import com.site.Entity.User;


@Repository
@EnableJpaRepositories
public interface UserRepo extends JpaRepository<User,Integer>{

	User findByEmail(String email);

	Object findByRole(String string);

	User save(RegisterDto registerDto);

}
