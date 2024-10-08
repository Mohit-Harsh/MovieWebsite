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
@NoArgsConstructor
@AllArgsConstructor
public class Booking
{

    private UUID bid;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.Confirmed;

    @Temporal(TemporalType.DATE)
    private Date date;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp timestamp;

    private String seatno;
    private UUID showid;
    private UUID userid;

}
