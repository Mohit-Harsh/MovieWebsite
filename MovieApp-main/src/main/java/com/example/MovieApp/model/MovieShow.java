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
public class MovieShow
{
    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    private UUID sid;

    //Params
    private String starttime;
    private String endtime;
    private String type;
    private List<Integer> prices;

    @Temporal(TemporalType.DATE)
    private Date advanceDate;

    //Mappings
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "scrid")
    private Screen screen;

    private String lang;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "mid")
    private Movie movie;

}
