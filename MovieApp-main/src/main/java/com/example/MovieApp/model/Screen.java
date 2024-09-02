package com.example.MovieApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Screen
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scrid;

    //Params
    @Column(columnDefinition = "varchar(10)")
    private String name;

    private String type;

    //Mappings
    @ManyToOne(cascade = CascadeType.ALL)
    private Theatre theatre;

    @JsonIgnore
    @OneToMany(mappedBy = "screen",cascade = CascadeType.ALL)
    private List<MovieShow> shows;

    private List<Integer> cols;
}
