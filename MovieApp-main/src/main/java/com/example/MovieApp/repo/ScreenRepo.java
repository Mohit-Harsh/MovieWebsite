package com.example.MovieApp.repo;

import com.example.MovieApp.model.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScreenRepo extends JpaRepository<Screen,Long> {

    @Query("select sc from Screen sc where sc.theatre.tid = :tid")
    List<Screen> findByTheatre(Long tid);
}
