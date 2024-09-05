package com.cinepick.bookings.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Booking")
public class Booking
{
    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
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
