package com.springboot.weatherwebapp.Service.Impl;


import com.springboot.weatherwebapp.Dto.WeatherResponseDto;
import com.springboot.weatherwebapp.Service.WeatherService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class WeatherServiceImpl implements WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public WeatherResponseDto getWeatherByCity(String city) {

        try {
            String url = String.format(
                    "%s?q=%s&appid=%s&units=metric",
                    apiUrl, city, apiKey
            );

            Map<String, Object> response =
                    restTemplate.getForObject(url, Map.class);

            if (response == null) {
                throw new RuntimeException("Empty response from weather API");
            }

            Map<String, Object> main =
                    (Map<String, Object>) response.get("main");
            List<Map<String, Object>> weatherList =
                    (List<Map<String, Object>>) response.get("weather");

            if (main == null || weatherList == null || weatherList.isEmpty()) {
                throw new RuntimeException("Invalid weather data received");
            }

            double temperature =
                    Double.parseDouble(main.get("temp").toString());
            String description =
                    weatherList.get(0).get("description").toString();

            return new WeatherResponseDto(city, temperature, description);

        } catch (HttpClientErrorException.NotFound ex) {
            throw new RuntimeException("City not found: " + city);
        } catch (HttpClientErrorException.Unauthorized ex) {
            throw new RuntimeException("Invalid or inactive weather API key");
        } catch (Exception ex) {
            throw new RuntimeException("Failed to fetch weather data");
        }
    }
}
