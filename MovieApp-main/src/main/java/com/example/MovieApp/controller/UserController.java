package com.example.MovieApp.controller;

import com.example.MovieApp.model.MovieUser;
import com.example.MovieApp.repo.MovieRepo;
import com.example.MovieApp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/user")
public class UserController
{
    @Autowired
    private UserRepo repo;

    @Autowired
    private MovieRepo mrepo;

    @PostMapping("/{userid}/recommendation")
    public void setRecommendations(@RequestBody List<UUID> mids, @PathVariable UUID userid)
    {
        MovieUser user = repo.findById(userid).get();
        user.setRecommendation(mids);
        repo.save(user);
    }

    @PostMapping("/signin")
    public Map<String,String> getUserId(@RequestBody Map<String,String> req)
    {
        MovieUser user = repo.findByUsername(req.get("username"));
        System.out.println(user);
        if(user!=null && user.getPassword().equals(req.get("password")))
        {
            Map<String,String> res = new HashMap<>();
            res.put("success",user.getUserid().toString());
            return res;
        }
        else
        {
            Map<String,String> res = new HashMap<>();
            res.put("failed","invalid credentials");
            return res;
        }
    }

    @PostMapping("/signup")
    public String createUser(@RequestBody Map<String,String> req)
    {
        MovieUser user = new MovieUser();
        user.setUsername(req.get("username"));
        user.setPassword(req.get("password"));

        try {
            repo.save(user);
        }
        catch (Exception e) {
            return "user already exists";
        }
        return "user created";
    }
}
