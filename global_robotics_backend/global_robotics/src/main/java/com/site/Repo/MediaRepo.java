package com.site.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.site.Entity.Media;

@Repository
@EnableJpaRepositories
public interface MediaRepo extends JpaRepository<Media, Integer>{

}
