package com.springboot.weatherwebapp.Service;

import com.springboot.weatherwebapp.Dto.WeatherResponseDto;

public interface WeatherService {

    WeatherResponseDto getWeatherByCity(String city);
}

