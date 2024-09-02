package com.example.MovieApp.repo;


import com.example.MovieApp.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.*;
@Repository
public interface TheatreRepo extends JpaRepository<Theatre,Long> {
    List<Theatre> findALLByCity(City city);
}
