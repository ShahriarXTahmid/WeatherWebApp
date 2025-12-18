# WeatherWebApp

WeatherWebApp is a web-based weather application developed with a strong emphasis on clean architecture, backend responsibility, and minimalistic user experience. The project is designed to demonstrate how a modern web application can securely integrate with third-party services while maintaining a clear separation between presentation logic and data access.

Rather than calling external weather APIs directly from the browser, weatherwebapp delegates all external communication to a Spring Boot backend. This approach avoids API key exposure, keeps the frontend lightweight, and mirrors patterns commonly used in production-grade systems.

---

## Project Intent

The primary goal of weatherwebapp is not to compete with feature-rich weather platforms, but to serve as a well-structured full-stack learning project. The focus is on:

* Designing a REST-driven backend
* Securing third-party API access
* Structuring frontend–backend communication correctly
* Building a calm, minimal UI that prioritizes clarity

This project reflects an architectural mindset rather than a UI-heavy or animation-driven approach.

---

## System Overview

At a high level, weatherwebapp operates through a simple but robust request flow:

1. A user enters a city name in the frontend interface
2. The frontend sends a REST request to the backend
3. The backend queries an external weather service
4. The backend processes and normalizes the response
5. A simplified JSON payload is returned to the frontend
6. The frontend renders only the required data

This design ensures the frontend remains independent of any third-party API structure or changes.

---

## Backend Architecture

The backend is implemented using **Java Spring Boot** and follows a service-oriented structure.

### Responsibilities of the Backend

* Acts as a secure proxy to the external weather API
* Stores and protects the API key
* Extracts and normalizes weather data
* Handles invalid city names and API failures
* Exposes a clean REST endpoint for client consumption

### REST Endpoint

```
GET /api/weather/{city}
```

The endpoint accepts a city name and returns a concise response object containing only the required information, such as temperature and basic weather details.

All error handling is centralized within the backend, allowing the frontend to remain simple and predictable.

---

## Frontend Design Philosophy

The frontend is built using **HTML, CSS and JavaScript**. The UI intentionally avoids clutter and excessive visual elements.

Key design characteristics include:

* Glass-morphism inspired layout
* Single-focus temperature display
* Live date and time rendering
* Toggle-based city search interaction
* No direct dependency on external APIs

The frontend communicates exclusively with the backend REST API and does not contain any sensitive configuration or API keys.

---

## Separation of Concerns

weatherwebapp strictly enforces separation of responsibilities:

* The frontend handles user interaction and display logic
* The backend handles data retrieval, transformation, and validation
* External services are abstracted away from the client

This separation allows the application to scale or evolve without tightly coupling components.

---

## Error Handling Strategy

All validation and error scenarios—such as invalid city names, network issues, or third-party API failures—are handled by the backend. The frontend simply reacts to HTTP responses and updates the UI accordingly.

This approach keeps frontend logic clean and prevents duplication of error-handling rules.

---

## Learning Outcomes

Through building weatherwebapp, the project demonstrates:

* Proper REST API design using Spring Boot
* Secure third-party API integration
* Real-world client–server communication
* Clean frontend–backend separation
* Architectural thinking suitable for enterprise systems

---

## Possible Future Enhancements

The current architecture allows easy extension, including:

* Multi-day weather forecasts
* Location-based weather lookup
* Weather condition icons
* Unit conversion (Celsius / Fahrenheit)
* Caching frequently searched cities

These enhancements can be introduced without altering the core design.

---

## Author

**Shahriar Tahmid**
*Software Engineering Student*
*Java | Spring Boot | Web Development*

GitHub: [https://github.com/ShahriarXTahmid](https://github.com/ShahriarXTahmid)
