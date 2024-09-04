package com.cinepick.history.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendDTO
{
    private String mid;
    private String title;
    private String genre;
    private String plot;
    private String cast;
}
