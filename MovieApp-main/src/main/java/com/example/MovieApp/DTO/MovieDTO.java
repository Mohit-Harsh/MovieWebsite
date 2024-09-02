package com.example.MovieApp.DTO;
import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDTO
{
    private String title="";
    private String certificate="";
    private String lang="";
    private String duration="";
    private String release;
    private String cast="";
    private String genre = "";
    private String platform="";
    private String plot="";
    private String watch="";
    private String poster="";
    private String posterwide="";
    private String trailer="";

}

//title	certificate	duration	release	cast	genre	stream	plot	poster	posterwide