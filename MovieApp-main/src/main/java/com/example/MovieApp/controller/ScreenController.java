package com.example.MovieApp.controller;

import com.example.MovieApp.DTO.ScreenDTO;
import com.example.MovieApp.DTO.ScreenListDTO;
import com.example.MovieApp.model.Screen;
import com.example.MovieApp.model.Theatre;
import com.example.MovieApp.repo.ScreenRepo;
import com.example.MovieApp.repo.TheatreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/screen")
public class ScreenController
{
    @Autowired
    private ScreenRepo repo;

    @Autowired
    private TheatreRepo trepo;

    @GetMapping("")
    public List<Screen> getAllScreens()
    {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Screen findById(@PathVariable Long id)
    {
        return repo.findById(id).get();
    }

    @GetMapping("/theatre/{tid}")
    public List<Screen> findByTheatre(@PathVariable Long tid)
    {
        return repo.findByTheatre(tid);
    }

    @PostMapping("")
    public void createScreens(@RequestBody ScreenListDTO screenListDTO)
    {
        for(ScreenDTO screenDTO : screenListDTO.getScreens())
        {
            Screen screen = new Screen();
            screen.setTheatre(trepo.findById(screenListDTO.getTid()).get());
            screen.setName(screenDTO.getName());
            screen.setType(screenDTO.getType());
            screen.setCols(screenDTO.getCols());

            repo.save(screen);
        }
    }
}
