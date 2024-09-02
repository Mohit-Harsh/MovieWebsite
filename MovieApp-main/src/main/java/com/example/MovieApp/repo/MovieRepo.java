package com.example.MovieApp.repo;


import com.example.MovieApp.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.*;
@Repository
public interface MovieRepo extends JpaRepository<Movie, UUID>
{
    @Query("select m from Movie m")
    List<Movie> findAllCurrent(Date d);

    List<Movie> findFirst10ByTitleContainingIgnoreCase(String title);
}
