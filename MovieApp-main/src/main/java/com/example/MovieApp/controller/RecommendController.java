package com.example.MovieApp.controller;
import com.example.MovieApp.model.Movie;
import com.example.MovieApp.repo.MovieRepo;
import com.example.MovieApp.repo.UserRepo;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/recommendation")
public class RecommendController
{
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private MovieRepo mrepo;

    @Autowired
    private UserRepo urepo;

    @GetMapping("/user/{userid}")
    public List<Movie> getRecommendations(@PathVariable UUID userid)
    {

        rabbitTemplate.convertAndSend("topic_exchange","recommend_route",userid);

        return urepo.findById(userid).get().getRecommendation();

    }
}
