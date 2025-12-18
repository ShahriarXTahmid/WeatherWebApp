const BACKEND_WEATHER_API = 'http://localhost:8080/api/weather';

class WeatherApp {
    constructor() {
        this.currentCity = '';
        this.initializeApp();
    }

    initializeApp() {
        // Update date & time every second
        this.updateTimeDate();
        setInterval(() => this.updateTimeDate(), 1000);

        // Toggle search visibility
        const toggleBtn = document.getElementById('toggle-search');
        const searchWrapper = document.getElementById('search-wrapper');
        if (toggleBtn && searchWrapper) {
            toggleBtn.addEventListener('click', () => {
                searchWrapper.classList.toggle('hidden');
            });
        }

        // Search bar (assumes custom-search-bar dispatches event 'citySearched')
        document.addEventListener('citySearched', (event) => {
            this.searchWeather(event.detail.city);
        });
    }

    async searchWeather(city) {
        if (!city.trim()) return;

        this.showLoading(true);

        try {
            const data = await this.fetchWeatherData(city);
            this.displayWeather(data);
            this.currentCity = city;
        } catch (error) {
            console.error('Weather fetch error:', error);
            this.showError('City not found. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    async fetchWeatherData(city) {
        const response = await fetch(`${BACKEND_WEATHER_API}/${encodeURIComponent(city)}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        // Construct icon URL if available
        if (data.icon) {
            data.iconUrl = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
        }

        return data;
    }

    displayWeather(data) {
        console.log('Weather data:', data); // Debug

        const temperature = document.getElementById('temperature');
        if (temperature && typeof data.temperature === 'number') {
            temperature.textContent = `${Math.round(data.temperature)}°C`;
        } else if (temperature) {
            temperature.textContent = '--°C';
        }

        const cityNameEl = document.getElementById('city-name');
        if (cityNameEl) {
            cityNameEl.textContent = (data && data.city) ? data.city : (this.currentCity || '--');
        }

        const weatherContainer = document.getElementById('weather-container');
        if (weatherContainer) weatherContainer.classList.add('fade-in');
    }


    updateTimeDate() {
        const now = new Date();
        const timeElement = document.getElementById('current-time');
        const dateElement = document.getElementById('current-date');

        if (timeElement) timeElement.textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        if (dateElement) dateElement.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    showLoading(show) {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) loadingElement.classList.toggle('hidden', !show);
    }

    showError(msg) {
        // Instead of alert, show in-page (optional)
        console.warn(msg);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
