
import axios from "axios";

class CinemaService {
    static async getListByName(type: string, name: string) {
        const response = await axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(name)}&type=${type}&apikey=${process.env.SECRET_KEY_CINEMA}`);

        if (response.data.Response === 'True') {
            return {
                error: false,
                data: response.data.Search.slice(0, 4)
            }
        }
        return {
            error: true,
            message: response.data.Error
        };
    }
}

export default CinemaService;
