package com.site.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.site.Dto.CourseDto;
import com.site.Entity.Course;
import com.site.Repo.CourseRepo;

@Service
public class CourseServiceImpl implements CourseService{
		
	@Autowired
	private CourseRepo courseRepo;

	@Override
	public void newCourse(CourseDto courseDto) {
		Course newCourse=new Course();
		newCourse.setTitle(courseDto.getTitle());
		newCourse.setDescription(courseDto.getDescription());
		newCourse.setImage(courseDto.getImage());
		courseRepo.save(newCourse);
	}

	@Override
	public List<Course> findAllCourses() {
		return courseRepo.findAll();
	}

	@Override
	public Course findCourseById(int id) {
		return courseRepo.findById(id).orElseThrow();
	}

	@Override
	public boolean existsById(int id) {
		if(courseRepo.findById(id)!=null) {
			return true;
		}
		return false;
	}

	@Override
	public void deleteById(int id) {
		courseRepo.deleteById(id);
		
	}

	@Override
	public Optional<Course> findById(int id) {
		return courseRepo.findById(id);
		
	}
}
