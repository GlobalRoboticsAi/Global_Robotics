package com.site.Service;

import java.util.List;
import java.util.Optional;

import com.site.Dto.CourseDto;
import com.site.Entity.Course;

public interface CourseService {

	void newCourse(CourseDto courseDto);

	List<Course> findAllCourses();

	Course findCourseById(int id);

	boolean existsById(int id);

	void deleteById(int id);

	Optional<Course> findById(int id);

}
