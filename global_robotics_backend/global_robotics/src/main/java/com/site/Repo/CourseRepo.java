package com.site.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.site.Entity.Course;

@Repository
@EnableJpaRepositories
public interface CourseRepo extends JpaRepository<Course,Integer>{

}
