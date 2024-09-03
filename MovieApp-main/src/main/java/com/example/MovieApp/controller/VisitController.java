package com.example.MovieApp.controller;

import com.example.MovieApp.model.Visited;
import com.example.MovieApp.repo.MovieRepo;
import com.example.MovieApp.repo.UserRepo;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/visit")
public class VisitController
{
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostMapping("")
    public void newVisit(@RequestBody Map<String,UUID> req)
    {

        Visited visited = new Visited();
        visited.setMid(req.get("mid"));
        visited.setUserid(req.get("userid"));
        visited.setDate(new Date());

        System.out.println(visited);

        rabbitTemplate.convertAndSend("topic_exchange","visit_route",visited);
    }
}
