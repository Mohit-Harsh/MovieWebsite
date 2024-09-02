package com.example.MovieApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowListDTO
{
    private UUID mid;
    private List<ShowDTO> shows;
}
