package com.example.MovieApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendDTO
{
    private UUID mid;
    private String title;
    private String genre;
    private String plot;
    private String cast;
}
