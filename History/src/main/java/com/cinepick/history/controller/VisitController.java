package com.cinepick.history.controller;

import com.cinepick.history.model.Visited;
import com.cinepick.history.repository.VisitRepo;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/visited")
public class VisitController
{
    @Autowired
    private VisitRepo repo;

    @GetMapping("/by/{uid}")
    public List<Visited> getLatest5Visits(@PathVariable UUID uid)
    {
        return repo.findFirst5ByUseridOrderByDateTime(uid);
    }

    @RabbitListener(queues = {"visit_queue"})
    public void createVisit(Visited visited)
    {
        List<Visited> v = repo.findAllByUserid(visited.getUserid());

        Visited v2 = repo.findByUseridAndMid(visited.getUserid(),visited.getMid());

        if(v2!=null)
        {
            v2.setDateTime(LocalDateTime.now());
            repo.save(v2);
        }
        else if(v.size()<5)
        {
            Visited new_visit = new Visited();
            new_visit.setDateTime(LocalDateTime.now());
            new_visit.setMid(visited.getMid());
            new_visit.setUserid(visited.getUserid());

            repo.save(new_visit);
        }
        else
        {
            Visited new_visit = v.getLast();
            new_visit.setDateTime(LocalDateTime.now());
            new_visit.setMid(visited.getMid());

            repo.save(new_visit);
        }

    }
}
