package com.example.MovieApp.controller;

import com.example.MovieApp.DTO.TheatreDTO;
import com.example.MovieApp.model.City;
import com.example.MovieApp.model.MovieShow;
import com.example.MovieApp.model.Screen;
import com.example.MovieApp.model.Theatre;
import com.example.MovieApp.repo.TheatreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/theatre")
public class TheatreController
{
    @Autowired
    private TheatreRepo theatreRepo;

    @GetMapping("")
    public List<Theatre> fingAll()
    {
        return theatreRepo.findAll();
    }

    @GetMapping("/city/{city}")
    public List<Theatre> findByCity(@PathVariable City city)
    {
        return theatreRepo.findALLByCity(city);
    }

    @GetMapping("/{id}")
    public Theatre getById(@PathVariable Long id)
    {
        return theatreRepo.findById(id).get();
    }

    @GetMapping("/{id}/screens")
    public List<Screen> getAllScreens(@PathVariable Long id)
    {
        return theatreRepo.findById(id).get().getScreens();
    }

    @GetMapping("/{id}/shows")
    public List<MovieShow> getAllShows(@PathVariable Long id)
    {
        List<MovieShow> shows = new ArrayList<>();
        for(Screen sc : theatreRepo.findById(id).get().getScreens())
        {
            shows.addAll(sc.getShows());
        }
        return shows;
    }

    @PostMapping("")
    public Theatre createTheatre(@RequestBody TheatreDTO theatreDTO)
    {
        Theatre theatre = new Theatre();
        theatre.setName(theatreDTO.getName());
        theatre.setAddress(theatreDTO.getAddress());
        theatre.setCity(theatreDTO.getCity());
        return theatreRepo.save(theatre);
    }

    @PostMapping("/list")
    public void createTheatreList(@RequestBody List<TheatreDTO> theatrelist)
    {
        for(TheatreDTO theatreDTO : theatrelist)
        {

            Theatre theatre = new Theatre();
            theatre.setName(theatreDTO.getName());
            theatre.setAddress(theatreDTO.getAddress());
            theatre.setCity(theatreDTO.getCity());
            theatreRepo.save(theatre);

        }
    }

    @DeleteMapping("")
    public void deleteAll()
    {
        theatreRepo.deleteAll();
    }
}
