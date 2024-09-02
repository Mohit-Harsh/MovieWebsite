package com.example.MovieApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScreenListDTO
{
    private Long tid;
    private List<ScreenDTO> screens;
}
