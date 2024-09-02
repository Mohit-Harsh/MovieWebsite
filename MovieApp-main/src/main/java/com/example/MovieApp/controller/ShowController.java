package com.example.MovieApp.controller;

import com.example.MovieApp.ApplicationException;
import com.example.MovieApp.DTO.ShowDTO;
import com.example.MovieApp.DTO.ShowListDTO;
import com.example.MovieApp.model.*;
import com.example.MovieApp.repo.MovieRepo;
import com.example.MovieApp.repo.ScreenRepo;
import com.example.MovieApp.repo.ShowRepo;
import com.example.MovieApp.repo.TheatreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/show")
public class ShowController
{
    @Autowired
    private ShowRepo repo;

    @Autowired
    private MovieRepo mrepo;

    @Autowired
    private ScreenRepo srepo;

    @GetMapping("")
    public List<MovieShow> findAll()
    {
        return repo.findAll();
    }

    public Boolean timeAvailability(Screen screen, String type, Time starttime, Time endtime)
    {
        List<MovieShow> shows = screen.getShows();

        if(shows.size() == 0)
        {
            return true;
        }

        ArrayList<ArrayList<Time>> timimgs = new ArrayList<>();

        for(MovieShow show : shows)
        {
            ArrayList<Time> arr = new ArrayList<>();
            arr.add(Time.valueOf(show.getStarttime()));
            arr.add(Time.valueOf(show.getEndtime()));
            timimgs.add(arr);
        }

        Comparator<ArrayList<Time>> com = new Comparator<ArrayList<Time>>() {

            @Override
            public int compare(ArrayList<Time> o1, ArrayList<Time> o2)
            {
                // TODO Auto-generated method stub
                if(o1.get(1).compareTo(o2.get(1)) > 0)
                {
                    return 1;
                }
                if(o1.get(1).compareTo(o2.get(1)) == 0)
                {
                    return 0;
                }
                return -1;
            }
        };

        Collections.sort(timimgs,com);

        if(endtime.compareTo(timimgs.get(0).get(0))<0)
        {
            return true;
        }
        if(starttime.compareTo(timimgs.getLast().get(1))>0)
        {
            return true;
        }
        for(int i=0;i<timimgs.size()-1;i++)
        {
            if((starttime.compareTo(timimgs.get(i).get(1))>0) && (endtime.compareTo(timimgs.get(i+1).get(0))<0))
            {
                return true;
            }
        }
        return false;
    }

    @PostMapping("")
    public String createShow(@RequestBody ShowDTO showDTO) throws Exception
    {
        MovieShow show = new MovieShow();
        Movie movie = mrepo.findById(showDTO.getMid()).get();
        Screen screen = srepo.findById(showDTO.getScrid()).get();

        if(timeAvailability(screen,showDTO.getType(),Time.valueOf(showDTO.getStarttime()),Time.valueOf(showDTO.getEndtime())) == false)
        {
            return("time error");
        }
        if(!showDTO.getType().equals(screen.getType()))
        {
            return("screen error");
        }
        show.setLang(showDTO.getLang());
        show.setMovie(movie);
        show.setScreen(screen);
        show.setStarttime(showDTO.getStarttime());
        show.setEndtime(showDTO.getEndtime());
        show.setType(showDTO.getType());
        show.setPrices(showDTO.getPrices());

        Date ad = new SimpleDateFormat("dd-mm-yyyy").parse(showDTO.getAdvanceDate());
        show.setAdvanceDate(ad);

        repo.save(show);

        return "success";
    }

    @PostMapping("/list")
    public List<String> createShowList(@RequestBody ShowListDTO showListDTO) throws Exception
    {
        List<String> res = new ArrayList<>();
        for(ShowDTO showDTO : showListDTO.getShows())
        {
            showDTO.setMid(showListDTO.getMid());
            res.add(createShow(showDTO));
        }
        return res;
    }

    @GetMapping("/{city}/{mid}")
    public Collection<List<MovieShow>> findAllShows(@PathVariable City city, @PathVariable UUID mid)
    {
        Map<Long,List<MovieShow>> map = new HashMap<>();

        List<MovieShow> shows = repo.findAlLShows(city,mid);

        for(MovieShow show : shows)
        {
            Long key = show.getScreen().getTheatre().getTid();
            if(map.containsKey(key))
            {
                map.get(key).add(show);
            }
            else
            {
                map.put(key,new ArrayList<>());
                map.get(key).add(show);
            }
        }

        return map.values();
    }
}
