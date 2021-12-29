import axios from "axios";

class WeatherService {
    static async getTemperature(city: string) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${process.env.WEATHER_API_KEY}`);

            if (response.data.cod === 200) {
                return {
                    error: false,
                    temp: Math.round(response.data.main.temp)
                }
            }

            return {
                error: true,
                message: 'City not found'
            }
        } catch (e) {
            return {
                error: true,
                message: 'City not found'
            }
        }
    }
}

export default WeatherService;
