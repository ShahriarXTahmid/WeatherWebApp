package com.springboot.weatherwebapp.Controller;

import com.springboot.weatherwebapp.Dto.WeatherResponseDto;
import com.springboot.weatherwebapp.Service.WeatherService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin // allow frontend JS requests from different origin
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/{city}")
    public WeatherResponseDto getWeather(@PathVariable String city) {
        return weatherService.getWeatherByCity(city);
    }
}
