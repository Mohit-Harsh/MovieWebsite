package com.example.MovieApp.DTO;

import com.example.MovieApp.model.City;
import com.example.MovieApp.model.Screen;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TheatreDTO
{
    private String name;
    private String address;
    private City city;
}
