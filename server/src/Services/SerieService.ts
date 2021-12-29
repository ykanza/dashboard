
import axios from "axios";

class CinemaService {
    static async getSerie(name: string) {
        const response = await axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(name)}&type=movie&apikey=${process.env.SECRET_KEY_CINEMA}`);
        if (response.data.Response === 'True') {
            return {
                error: false,
                data: response.data.Search
            }
        }
        return {
            error: true,
            message: response.data.Error
        };
    }
}

export default CinemaService;
