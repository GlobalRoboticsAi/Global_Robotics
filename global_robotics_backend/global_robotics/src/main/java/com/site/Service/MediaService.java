package com.site.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface MediaService {

	String uploadMedia(MultipartFile file) throws IOException;

	ResponseEntity<byte[]> getMediaFile(int id);

	String deleteMedia(int id);

	List<Map<String, Object>> getAllMedia();

	
}
