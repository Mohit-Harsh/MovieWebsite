package com.cinepick.history.controller;

import com.cinepick.history.model.RecommendDTO;
import com.cinepick.history.model.Visited;
import com.cinepick.history.repository.VisitRepo;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/recommendation")
public class RecommendController
{
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private VisitRepo repo;

    @RabbitListener(queues = {"recommend_queue"})
    public void getRecommendations(UUID userid)
    {

        List<Visited> visited = repo.findAllByUserid(userid);

        List<UUID> mids = new ArrayList<>();

        for(Visited v:visited)
        {
            mids.add(v.getMid());
        }

        ArrayList<RecommendDTO> movies = restTemplate.postForObject("http://localhost:8080/api/movie/all",mids,ArrayList.class);

        restTemplate.postForObject("http://localhost:8000/api/recommend",movies,ArrayList.class);

    }

}
