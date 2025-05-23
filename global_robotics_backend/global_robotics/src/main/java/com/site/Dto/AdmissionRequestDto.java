package com.site.Dto;

public class AdmissionRequestDto {
    private String name;
    private String email;
    private String mobile;
    private String courseTitle;
    private String message;
	public AdmissionRequestDto() {
		super();
	}
	public AdmissionRequestDto(String name, String email, String mobile, String courseTitle, String message) {
		super();
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.courseTitle = courseTitle;
		this.message = message;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getCourseTitle() {
		return courseTitle;
	}
	public void setCourseTitle(String courseTitle) {
		this.courseTitle = courseTitle;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "AdmissionRequestDto [name=" + name + ", email=" + email + ", mobile=" + mobile + ", courseTitle="
				+ courseTitle + ", message=" + message + "]";
	}
    
    

    
}

