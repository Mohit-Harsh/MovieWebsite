package com.example.MovieApp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Visited
{

    @Temporal(TemporalType.DATE)
    private Date date;

    private UUID mid;

    private UUID userid;

}
