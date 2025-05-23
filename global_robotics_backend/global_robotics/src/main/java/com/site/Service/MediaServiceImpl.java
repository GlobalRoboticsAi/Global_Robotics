package com.site.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.site.Entity.Media;
import com.site.Repo.MediaRepo;

@Service
public class MediaServiceImpl implements MediaService{
	
	@Autowired
	private MediaRepo mediaRepo;

	@Override
	public String uploadMedia(MultipartFile file) throws IOException {
        String contentType = file.getContentType();
        String type = contentType != null && contentType.startsWith("video") ? "video" : "image";

        Media media = new Media();
        media.setType(type);
        media.setContentType(contentType);
        media.setData(file.getBytes());

        mediaRepo.save(media);
        return "Uploaded successfully";
    }

	
	@Override
	 public ResponseEntity<byte[]> getMediaFile(int id) {
	        return mediaRepo.findById(id)
	                .map(media -> ResponseEntity.ok()
	                        .contentType(MediaType.parseMediaType(media.getContentType()))
	                        .body(media.getData()))
	                .orElse(ResponseEntity.notFound().build());
	    }

	@Override
	public String deleteMedia(int id) {
        if (!mediaRepo.existsById(id)) {
            throw new RuntimeException("Media not found");
        }
        mediaRepo.deleteById(id);
        return "Deleted successfully";
    }


	@Override
	public List<Map<String, Object>> getAllMedia() {
	    List<Media> mediaList = mediaRepo.findAll();

	    List<Map<String, Object>> result = new ArrayList<>();
	    for (Media media : mediaList) {
	        Map<String, Object> map = new HashMap<>();
	        map.put("id", media.getId());
	        map.put("type", media.getType());
	        result.add(map);
	    }

	    return result;
	}
	
}
