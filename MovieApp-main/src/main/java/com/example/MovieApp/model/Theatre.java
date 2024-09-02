package com.example.MovieApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Theatre
{
    //Id
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tid;

    //Params
    @Column(columnDefinition = "TEXT")
    private String name;
    @Column(columnDefinition = "TEXT")
    private String address;

    //Mappings
    @Enumerated(EnumType.STRING)
    private City city;

    @JsonIgnore
    @OneToMany(mappedBy = "theatre",cascade = CascadeType.ALL)
    private List<Screen> screens;
}
