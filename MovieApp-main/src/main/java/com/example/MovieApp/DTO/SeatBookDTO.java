package com.example.MovieApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatBookDTO
{
    private UUID uid;
    private UUID sid;
    private String date;
    private List<String> seats;
}
