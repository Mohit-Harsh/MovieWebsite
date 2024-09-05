package com.cinepick.bookings.repository;

import com.cinepick.bookings.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepo extends JpaRepository<Booking, UUID>
{
    @Query("select b.seatno from Booking b where b.showid =:sid and b.date = :date")
    List<String> findAllBookedSeats(UUID sid, Date date);
}
