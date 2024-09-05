package com.example.MovieApp.controller;

import com.example.MovieApp.DTO.SeatBookDTO;
import com.example.MovieApp.model.Booking;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.text.ParseException;
import java.util.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/booking")
public class BookingController
{

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("")
    public List<Booking> getAllBookings()
    {
        List<Booking> bookings = restTemplate.getForObject("http://localhost:8082/api/booking", ArrayList.class);
        return bookings;
    }

    @PostMapping("")
    public Object bookTicket(@RequestBody SeatBookDTO seatBookDTO)
    {
        Object res = rabbitTemplate.convertSendAndReceive("topic_exchange","booking_route",seatBookDTO);

        System.out.println(res);

        return res;
    }

    @PostMapping("/seats")
    public List<String> getBookedSeats(@RequestBody SeatBookDTO seatBookDTO) throws ParseException
    {
       return restTemplate.postForObject("http://localhost:8082/api/booking/seats",seatBookDTO,ArrayList.class);
    }
}
