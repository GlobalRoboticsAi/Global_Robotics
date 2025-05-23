package com.site.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.site.Dto.CourseDto;
import com.site.Dto.JobDto;
import com.site.Entity.Course;
import com.site.Entity.JobDetails;
import com.site.Service.CourseService;
import com.site.Service.JobDetailsService;
import com.site.Service.MediaService;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private JobDetailsService jobDetailsService;
	
	@Autowired
	private CourseService courseService;
	
	@Autowired
	private MediaService mediaService;
	
	@PostMapping("/addnewjob")
	public ResponseEntity<?>addNewJob(@RequestBody JobDto jobDto){
		jobDetailsService.newJob(jobDto);
		return ResponseEntity.ok("Job Added Successfully");
	}
	
	@GetMapping("/getalljobs")
	public List<JobDetails> getall(){
		return jobDetailsService.fetchAll();
	}
	
	@DeleteMapping("/deletejob/{id}")
	public ResponseEntity<String>deleteById(@PathVariable int id){
		jobDetailsService.deleteById(id);
		return ResponseEntity.ok("Deleted Successfully!");
	}
	
	@GetMapping("/getbyid/{id}")
	public ResponseEntity<JobDetails>getJobDetailsById(@PathVariable int id){
		JobDetails jobdetails=jobDetailsService.getJobById(id);
		return ResponseEntity.ok(jobdetails);
	}
	
	@PutMapping("/editjob/{id}")
	public ResponseEntity<String> updateJob(@PathVariable int id, @RequestBody JobDto jobDto) {
	    jobDetailsService.updateJob(id, jobDto);
	    return ResponseEntity.ok("Job updated successfully");
	}
	
	@PostMapping(value = "/addnewcourse", consumes = "multipart/form-data")
	public ResponseEntity<String> addNewCourse(
	        @RequestParam("title") String title,
	        @RequestParam("description") String description,
	        @RequestParam("image") MultipartFile imageFile) {

	    try {
	        byte[] imageBytes = imageFile.getBytes();

	        CourseDto courseDto = new CourseDto();
	        courseDto.setTitle(title);
	        courseDto.setDescription(description);
	        courseDto.setImage(imageBytes);

	        courseService.newCourse(courseDto);

	        return ResponseEntity.ok("Course Added Successfully");

	    } catch (Exception e) {
	        return ResponseEntity.status(500).body("Failed to add course: " + e.getMessage());
	    }
	}

	
	@GetMapping("/getallcourses")
	public List<Course>getAllCourses(){
		return courseService.findAllCourses();
	}
	
	@GetMapping("/course-image/{id}")
	public ResponseEntity<byte[]> getCourseImage(@PathVariable int id) {
	    Course course = courseService.findCourseById(id); // you must implement this
	    if (course == null || course.getImage() == null) {
	        return ResponseEntity.notFound().build();
	    }

	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.IMAGE_PNG); // change to IMAGE_PNG if needed
	    return new ResponseEntity<>(course.getImage(), headers, HttpStatus.OK);
	}
	
	

	@DeleteMapping("/delete-course/{id}")
	public ResponseEntity<String> deleteCourse(@PathVariable int id) {
	    if (courseService.existsById(id)) {
	        courseService.deleteById(id);
	        return ResponseEntity.ok("Course deleted successfully");
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
	    }
	}

	
	@GetMapping("/getcourse/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable int id) {
        Optional<Course> course = courseService.findById(id);
        if (course.isPresent()) {
            return ResponseEntity.ok(course.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
//	Media
	
	@PostMapping("/upload")
    public ResponseEntity<String> uploadMedia(@RequestParam("file") MultipartFile file) throws IOException {
        String message = mediaService.uploadMedia(file);
        return ResponseEntity.ok(message);
    }

	@GetMapping("/all")
	public ResponseEntity<List<Map<String, Object>>> getAllMedia() {
	    List<Map<String, Object>> mediaList = mediaService.getAllMedia();
	    return ResponseEntity.ok(mediaList);
	}


    @GetMapping("/view/{id}")
    public ResponseEntity<byte[]> viewMedia(@PathVariable int id) {
        return mediaService.getMediaFile(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMedia(@PathVariable int id) {
        String message = mediaService.deleteMedia(id);
        return ResponseEntity.ok(message);
    }
	
}	

