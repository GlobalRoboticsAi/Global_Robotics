package com.site.Service;

import java.util.List;

import com.site.Dto.JobDto;
import com.site.Entity.JobDetails;

public interface JobDetailsService {

	void newJob(JobDto jobDto);

	List<JobDetails> fetchAll();

	void deleteById(int id);

	JobDetails getJobById(int id);

	void updateJob(int id, JobDto jobDto);

}
