package com.example.MovieApp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieReview
{
    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    private UUID rid;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(precision = 1)
    private int rating;

    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToOne
    private Movie movie;

    @ManyToMany
    private List<MovieUser> user;

}
