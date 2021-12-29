
import axios from "axios";

class RedditService {
    static async getPost(subreddit: string) {
        try {
            const response = await axios.get(`https://reddit.com/r/${encodeURIComponent(subreddit)}/about.json`);
            return {
                error: false,
                name: response.data.data.display_name,
                title: response.data.data.title,
                sub: response.data.data.subscribers,
                online: response.data.data.active_user_count,
                type: response.data.data.subreddit_type,
                icon: response.data.data.icon_img
            }
        }
        catch (e) {
            return {
                error: true,
                message: 'Subreddit not found !'
            };
        }
    }
}

export default RedditService;
