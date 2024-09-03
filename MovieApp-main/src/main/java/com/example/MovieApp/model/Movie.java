package com.example.MovieApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie
{
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    private UUID mid;

    //Params
    @Column(columnDefinition = "TEXT")
    private String title;
    private String duration;
    private String certificate;
    @Column(columnDefinition = "TEXT")
    private String plot;
    @Temporal(TemporalType.DATE)
    private Date releaseDate;
    private String poster;
    private String posterWide;
    private String trailer;
    private String lang;
    private String genre;
    private String movieCast;
    private String platform;
    private String watch;

    //Mappings
    @JsonIgnore
    @OneToMany(mappedBy = "movie",cascade = CascadeType.ALL)
    private List<MovieShow> movieshows;

    @JsonIgnore
    @OneToMany(mappedBy = "movie",cascade = CascadeType.ALL)
    private List<MovieReview> reviews;

}
