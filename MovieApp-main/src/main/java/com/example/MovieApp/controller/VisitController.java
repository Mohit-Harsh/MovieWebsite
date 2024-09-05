package com.example.MovieApp.controller;

import com.example.MovieApp.model.Visited;
import com.example.MovieApp.repo.MovieRepo;
import com.example.MovieApp.repo.UserRepo;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/visit")
public class VisitController
{
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostMapping("")
    public void newVisit(@RequestBody Visited visited)
    {
        System.out.println(visited);
        rabbitTemplate.convertAndSend("topic_exchange","visit_route",visited);
    }
}
