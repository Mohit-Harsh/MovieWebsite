package com.example.MovieApp.controller;

import com.example.MovieApp.DTO.SeatBookDTO;
import com.example.MovieApp.model.Booking;
import com.example.MovieApp.model.BookingStatus;
import com.example.MovieApp.repo.BookingRepo;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/booking")
public class BookingController
{
    @Autowired
    private BookingRepo repo;

    @Autowired
    private RabbitTemplate rabbitTemplate;

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

    @PostMapping("")
    public String bookTicket(@RequestBody SeatBookDTO seatBookDTO) throws ParseException
    {
        Date date = new SimpleDateFormat("dd-mm-yyyy").parse(seatBookDTO.getDate());
        for(String seat : seatBookDTO.getSeats())
        {
            if (seatAvailable(seat, seatBookDTO.getSid(), date))
            {
                Booking booking = new Booking();
                booking.setShowid(seatBookDTO.getSid());

                booking.setDate(date);
                booking.setSeatno(seat);

                Booking b = repo.save(booking);

                rabbitTemplate.convertAndSend("topic_exchange","booking_route",b);

            }
            else
            {
                return "Seat not available";
            }
        }
        return "Seats booked";
    }

    @PostMapping("/seats")
    public List<String> getBookedSeats(@RequestBody SeatBookDTO seatBookDTO) throws ParseException
    {
        List<String> seats = repo.findAllBookedSeats(seatBookDTO.getSid(),new SimpleDateFormat("dd-mm-yyyy").parse(seatBookDTO.getDate()));

        return seats;
    }
}
