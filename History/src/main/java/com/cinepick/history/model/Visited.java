package com.cinepick.history.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Visited
{
    @Id
    @UuidGenerator(style= UuidGenerator.Style.TIME)
    private UUID vid;

    private LocalDateTime dateTime;

    private UUID mid;
    private UUID userid;

}
