package com.example.MovieApp.repo;

import com.example.MovieApp.model.MovieUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<MovieUser, UUID>
{

    MovieUser findByUsername(String username);
}
