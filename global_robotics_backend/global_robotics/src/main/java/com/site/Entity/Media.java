package com.site.Entity;

import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String type; // "video" or "image"

    private String contentType;

    @Lob
    @Column(length = Integer.MAX_VALUE)
    private byte[] data;

	public Media() {
		super();
	}

	public Media(int id, String type, String contentType, byte[] data) {
		super();
		this.id = id;
		this.type = type;
		this.contentType = contentType;
		this.data = data;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "Media [id=" + id + ", type=" + type + ", contentType=" + contentType + ", data=" + Arrays.toString(data)
				+ "]";
	}

    
}

