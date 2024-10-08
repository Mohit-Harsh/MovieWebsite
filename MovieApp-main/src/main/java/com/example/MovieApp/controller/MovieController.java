package com.example.MovieApp.controller;
import com.example.MovieApp.DTO.MovieDTO;
import com.example.MovieApp.model.*;
import com.example.MovieApp.repo.MovieRepo;
import com.example.MovieApp.repo.TheatreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import com.example.MovieApp.DTO.RecommendDTO;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/movie")
public class MovieController
{
    @Autowired
    private MovieRepo repo;

    @Autowired
    private TheatreRepo trepo;

    @GetMapping("")
    public List<Movie> findAll()
    {
        return repo.findAll();
    }

    @PostMapping("/all")
    public List<RecommendDTO> findAllById(@RequestBody List<UUID> ids)
    {
        List<RecommendDTO> recommendDTOS = new ArrayList<>();

        for(Movie mov : repo.findAllById(ids))
        {
            RecommendDTO recommendDTO = new RecommendDTO();
            recommendDTO.setMid(mov.getMid());
            recommendDTO.setTitle(mov.getTitle());
            recommendDTO.setPlot(mov.getPlot());
            recommendDTO.setGenre(mov.getGenre());
            recommendDTO.setCast(mov.getMovieCast());

            recommendDTOS.add(recommendDTO);
        }

        return recommendDTOS;
    }

    @GetMapping("/{id}")
    public Movie findById(@PathVariable UUID id)
    {
        return repo.findById(id).get();
    }

    @GetMapping("/search/{title}")
    public List<Movie> findByTitleContainingIgnoreCase(@PathVariable String title)
    {
        return repo.findFirst10ByTitleContainingIgnoreCase(title);
    }

    @GetMapping("/city/{city}")
    public Set<Movie> findAllCurrent(@PathVariable City city)
    {
        List<Theatre> theatres = trepo.findALLByCity(city);

        List<Screen> screens = new ArrayList<>();

        for(Theatre theatre : theatres)
        {
            screens.addAll(theatre.getScreens());
        }

        Set<Movie> movies = new HashSet<>();

        for(Screen screen : screens)
        {
            for(MovieShow show : screen.getShows())
            {
                movies.add(show.getMovie());
            }
        }

        return movies;
    }

    @PostMapping("")
    public void createMovie(@RequestBody MovieDTO movieDTO) throws ParseException {
        Movie movie = new Movie();

        System.out.println(movieDTO);

        movie.setTitle(movieDTO.getTitle());
        movie.setPlot(movieDTO.getPlot());
        movie.setDuration(movieDTO.getDuration());
        movie.setCertificate(movieDTO.getCertificate());
        movie.setMovieCast(movieDTO.getCast());
        movie.setGenre(movieDTO.getGenre());
        movie.setLang(movieDTO.getLang());
        movie.setPlatform(movieDTO.getPlatform());
        movie.setWatch(movieDTO.getWatch());

        Date date = new SimpleDateFormat("dd-mm-yyyy").parse(movieDTO.getRelease());

        movie.setReleaseDate(date);
        movie.setPoster(movieDTO.getPoster());
        movie.setPosterWide(movieDTO.getPosterwide());
        movie.setTrailer(movieDTO.getTrailer());

        repo.save(movie);
    }
}
