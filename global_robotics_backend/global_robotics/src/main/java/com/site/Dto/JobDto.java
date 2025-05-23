package com.site.Dto;

public class JobDto {
	private int id;
	private String title;
	private String description;
	public JobDto() {
		super();
	}
	public JobDto(int id, String title, String description) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
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
	public void setTiltle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String toString() {
		return "JobDto [id=" + id + ", title=" + title + ", description=" + description + "]";
	}
	
	
}
