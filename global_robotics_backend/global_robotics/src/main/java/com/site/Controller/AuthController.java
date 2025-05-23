package com.site.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.site.Config.JwtUtil;
import com.site.Dto.AdmissionRequestDto;
import com.site.Dto.ContactFormDto;
import com.site.Dto.LoginDto;
import com.site.Dto.RegisterDto;
import com.site.Entity.Course;
import com.site.Entity.JobDetails;
import com.site.Entity.User;
import com.site.Repo.UserRepo;
import com.site.Service.CourseService;
import com.site.Service.JobDetailsService;
import com.site.Service.MailService;
import com.site.Service.MediaService;
import com.site.Service.OTPService;
import com.site.Service.UserService;

import jakarta.mail.internet.MimeMessage;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private UserRepo userRepo;
    
    
    @Autowired
    private UserService userService; 
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JobDetailsService jobDetailsService;
    
    @Autowired
    private OTPService otpService;

    @Autowired
    private MailService mailService;
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private CourseService courseService;
    
    @Autowired
    private MediaService mediaService;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {
        // Check if a user already exists with the provided email
        User existingUser = userRepo.findByEmail(registerDto.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists with this email");
        }

        // Convert RegisterDto to User entity
        User user = new User();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setContact(registerDto.getContact());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword())); // Encrypt password

        // Always set role as USER
        user.setRole("USER");

        // Save the user entity to the database
        User savedUser = userRepo.save(user);

        // Return the saved user in the response
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }


    
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", userDetails.getUsername());
        response.put("authorities", userDetails.getAuthorities());
        return response;
    }
    
    
    @PostMapping("/send-otp")
    public String sendOtp(@RequestParam String email) {
    	User user = userService.existsByEmail(email);
        if (user.equals(null)) {
            return "User not found";
        }
        String otp = otpService.generateOTP(email);
        mailService.sendOTP(email, otp);
        return "OTP sent to email";
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String email, @RequestParam String otp) {
        if (otpService.validateOTP(email, otp)) {
            otpService.clearOTP(email);
            return "OTP verified";
        }
        return "Invalid OTP";
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String email, @RequestParam String newPassword) {
        userService.updatePassword(email, newPassword);
        return "Password updated";
    }
    
    
    @PostMapping("/contact")
    public ResponseEntity<String> sendContactMail(@RequestBody ContactFormDto form) {
        try {
        	System.out.println("Email");
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("maliv0589@gmail.com"); // Your company's receiving email
            message.setSubject("New Contact Message from " + form.getName());
            message.setText(
                    "Name: " + form.getName() + "\n" +
                    "Email: " + form.getEmail() + "\n" +
                    "Phone: " + form.getPhone() + "\n" +
                    "Message:\n" + form.getMessage()
            );

            mailSender.send(message);
            return ResponseEntity.ok("Message sent successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send message.");
        }
    }
    
    
    @PostMapping("/admission")
    public ResponseEntity<String> applyForAdmission(@RequestBody AdmissionRequestDto request) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo("vaibhavmali2387@gmail.com");
            helper.setSubject("New Admission Application for " + request.getCourseTitle());

            String content = String.format(
                "Candidate Details:\n\nName: %s\nEmail: %s\nMobile: %s\nCourse Applied: %s\n\nMessage: %s",
                request.getName(), request.getEmail(), request.getMobile(),
                request.getCourseTitle(), request.getMessage()
            );

            helper.setText(content);
            mailSender.send(message);

            return ResponseEntity.ok("Admission email sent successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to send email: " + e.getMessage());
        }
    }


    
    	@GetMapping("/getalljobs")
    	public List<JobDetails>getallJobs(){
    		return jobDetailsService.fetchAll();
    	}
    	
    	@GetMapping("/getallcourses")
    	public List<Course>getAllCourses(){
    		return courseService.findAllCourses();
    	}
    	
    	
//    	Get all Videos and Images
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
    	
    	@GetMapping("/all")
    	public ResponseEntity<List<Map<String, Object>>> getAllMedia() {
    	    List<Map<String, Object>> mediaList = mediaService.getAllMedia();
    	    return ResponseEntity.ok(mediaList);
    	}


        @GetMapping("/view/{id}")
        public ResponseEntity<byte[]> viewMedia(@PathVariable int id) {
            return mediaService.getMediaFile(id);
        }
        
        @GetMapping("/test")
        public ResponseEntity<String>check(){
        	return ResponseEntity.ok("Successs!!!");
        }
}
