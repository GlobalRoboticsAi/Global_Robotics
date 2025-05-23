package com.site.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.site.Entity.Course;
import com.site.Entity.JobDetails;
import com.site.Service.CourseService;
import com.site.Service.JobDetailsService;

import jakarta.mail.internet.MimeMessage;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
	@Autowired
	private JobDetailsService jobDetailsService;
	
	 @Autowired
	    private JavaMailSender mailSender;
	 
	 @Autowired
	 private CourseService courseService;
	
	@GetMapping("/getalljobs")
	public List<JobDetails>getallJobs(){
		return jobDetailsService.fetchAll();
	}
	
	
	@PostMapping("/applyjob")
    public ResponseEntity<String> applyJob(
        @RequestParam String name,
        @RequestParam String email,
        @RequestParam String mobile,
        @RequestParam String jobTitle,
        @RequestParam MultipartFile resume
    ) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo("vaibhavmali2387@gmail.com"); // Company HR Email
            helper.setSubject("New Job Application for " + jobTitle);

            String content = String.format(
                "Candidate Details:\n\nName: %s\nEmail: %s\nMobile: %s\nApplied For: %s",
                name, email, mobile, jobTitle
            );

            helper.setText(content);

            // Attach resume
            helper.addAttachment(resume.getOriginalFilename(), resume);

            mailSender.send(message);

            return ResponseEntity.ok("Application sent successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to send email: " + e.getMessage());
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
}
