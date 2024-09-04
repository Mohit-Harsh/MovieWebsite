package com.example.MovieApp.config;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RabbiMQConfig
{
    @Bean
    public RestTemplate restTemplate()
    {
        return new RestTemplate();
    }

    @Bean
    public Queue recommendQueue()
    {
        return new Queue("recommend_queue");
    }

    @Bean
    public Queue visitQueue()
    {
        return new Queue("visit_queue");
    }

    @Bean
    public Queue bookingQueue()
    {
        return new Queue("booking_queue");
    }

    @Bean
    public TopicExchange exchange()
    {
        return new TopicExchange("topic_exchange");
    }

    @Bean
    public Binding visitBinding()
    {
        return BindingBuilder.bind(visitQueue()).to(exchange()).with("visit_route");
    }

    @Bean
    public Binding recommendBinding()
    {
        return BindingBuilder.bind(recommendQueue()).to(exchange()).with("recommend_route");
    }

    @Bean
    public Binding bookingBinding()
    {
        return BindingBuilder.bind(bookingQueue()).to(exchange()).with("booking_route");
    }

    @Bean
    public MessageConverter converter()
    {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory)
    {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(converter());
        return rabbitTemplate;
    }
}
