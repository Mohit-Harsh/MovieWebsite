package com.example.MovieApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowDTO
{
    private UUID mid;
    private Long scrid;
    private String starttime;
    private String endtime;
    private String type;
    private String lang;
    private String advanceDate;
    private List<Integer> prices;
}
