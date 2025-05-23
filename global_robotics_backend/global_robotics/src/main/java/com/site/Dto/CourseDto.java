package com.site.Dto;

import java.util.Arrays;

public class CourseDto {
	private int id;
    private String title;
    private String description;
    private byte[] image;
	public CourseDto() {
		super();
	}
	public CourseDto(int id, String title, String description, byte[] image) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.image = image;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	@Override
	public String toString() {
		return "CourseDto [id=" + id + ", title=" + title + ", description=" + description + ", image="
				+ Arrays.toString(image) + "]";
	}
    
    
}
