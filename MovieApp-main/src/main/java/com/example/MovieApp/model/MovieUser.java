package com.example.MovieApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieUser
{

    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    private UUID userid;

    @Column(length = 20,unique = true)
    private String username;

    @Column(length = 20)
    private String password;

    @JsonIgnore
    @ManyToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<MovieReview> review;

}
