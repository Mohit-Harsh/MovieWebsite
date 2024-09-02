package com.example.MovieApp.repo;


import com.example.MovieApp.model.City;
import com.example.MovieApp.model.MovieShow;
import com.example.MovieApp.model.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ShowRepo extends JpaRepository<MovieShow, UUID> {
    @Query("select show from MovieShow show where show.movie.mid = :mid and show.screen.theatre.city = :city")
    List<MovieShow> findAlLShows(City city, UUID mid);
}
