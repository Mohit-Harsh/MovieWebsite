package com.cinepick.bookings.controller;
import com.cinepick.bookings.DTO.SeatBookDTO;
import com.cinepick.bookings.model.Booking;
import com.cinepick.bookings.repository.BookingRepo;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/booking")
public class BookingController
{
    @Autowired
    private BookingRepo repo;

    @GetMapping("")
    public List<Booking> getAllBookings()
    {
        return repo.findAll();
    }

    public boolean seatAvailable(String seat, UUID showid, Date date)
    {
        List<String> seats = repo.findAllBookedSeats(showid,date);
        if(seats.contains(seat))
        {
            return false;
        }
        return true;
    }

    @RabbitListener(queues = {"booking_queue"})
    public String bookTicket(@RequestBody SeatBookDTO seatBookDTO) throws ParseException
    {
        try
        {
            Date date = new SimpleDateFormat("dd-mm-yyyy").parse(seatBookDTO.getDate());
            for (String seat : seatBookDTO.getSeats()) {
                if (seatAvailable(seat, seatBookDTO.getSid(), date)) {
                    Booking booking = new Booking();
                    booking.setShowid(seatBookDTO.getSid());
                    booking.setUserid(seatBookDTO.getUid());
                    booking.setDate(date);
                    booking.setSeatno(seat);
                    booking.setTimestamp(LocalDateTime.now());

                    Booking b = repo.save(booking);

                } else {
                    return "Seat not available";
                }
            }
            return "Seats booked";
        }
        catch (Exception e)
        {
            return e.getMessage();
        }
    }

    @PostMapping("/seats")
    public List<String> getBookedSeats(@RequestBody SeatBookDTO seatBookDTO) throws ParseException
    {
        List<String> seats = repo.findAllBookedSeats(seatBookDTO.getSid(),new SimpleDateFormat("dd-mm-yyyy").parse(seatBookDTO.getDate()));

        return seats;
    }
}
