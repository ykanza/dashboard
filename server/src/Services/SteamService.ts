
import axios from "axios";

class SteamService {
    static async getplayerCount(id: any) {
        const response = await axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${encodeURIComponent(id)}`);
        if (response.data.response.player_count) {
            return {
                error: false,
                count: response.data.response.player_count
            }
        }
        return {
            error: true,
            message: 'App id not found'
        };
    }
}

export default SteamService;
