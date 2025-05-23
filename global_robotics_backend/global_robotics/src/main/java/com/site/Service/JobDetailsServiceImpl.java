package com.site.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.site.Dto.JobDto;
import com.site.Entity.JobDetails;
import com.site.Repo.JobDetailsRepo;

@Service
public class JobDetailsServiceImpl implements JobDetailsService{
	
	@Autowired
	private JobDetailsRepo jobDetailsRepo;

	@Override
	public void newJob(JobDto jobDto) {
		JobDetails existingJob=jobDetailsRepo.findByTitle(jobDto.getTitle());
		if(existingJob== null) {
			JobDetails newJob= new JobDetails();
			newJob.setId(jobDto.getId());
			newJob.setTitle(jobDto.getTitle());
			newJob.setDescription(jobDto.getDescription());
			jobDetailsRepo.save(newJob);
		}
		
	}

	@Override
	public List<JobDetails> fetchAll() {
		return jobDetailsRepo.findAll();
	}

	@Override
	public void deleteById(int id) {
		jobDetailsRepo.deleteById(id);
		
	}

	@Override
	public JobDetails getJobById(int id) {
		return jobDetailsRepo.findById(id).orElseThrow(() -> new RuntimeException("Job not found with ID: " + id));
	}

	@Override
	public void updateJob(int id, JobDto jobDto) {
		Optional<JobDetails> optionalJob = jobDetailsRepo.findById(id);
        if (optionalJob.isPresent()) {
            JobDetails job = optionalJob.get();
            job.setTitle(jobDto.getTitle());
            job.setDescription(jobDto.getDescription());
            jobDetailsRepo.save(job);
        } else {
            throw new RuntimeException("Job not found with ID: " + id);
        }
		
	}
	
	
}
