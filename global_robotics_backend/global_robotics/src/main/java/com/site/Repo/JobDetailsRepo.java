package com.site.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.site.Entity.JobDetails;

@Repository
@EnableJpaRepositories
public interface JobDetailsRepo extends JpaRepository<JobDetails,Integer>{

	JobDetails findByTitle(String title);

}
