import axios from "axios";

class YoutubeService {
    static async getChannelStats(channelName: string) {
        try {
            let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${channelName}&key=${process.env.YOUTUBE_API_KEY}`);

            if (!response.data.items.length
                || response.data.items[0].snippet.channelTitle.toLowerCase() !== channelName.toLowerCase()) {
                return {
                    error: true,
                    message: 'Channel not found'
                };
            }
            const channelId = response.data.items[0].snippet.channelId;

            response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`);

            if (!response.data.items.length)
                return {error: true, message: 'Channel stats not found'}

            return {
                error: false,
                data: response.data.items[0]
            };
        } catch (e: any) {
            return {
                error: true,
                message: e.message,
            }
        }
    }

    static async getVideoStats(videoName: string) {
        try {
            let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${videoName}&key=${process.env.YOUTUBE_API_KEY}`);
            if (!response.data.items.length)
                return {error: true, message: 'Video name not found'}

            const videoId = response.data.items[0].id.videoId;

            response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`);

            if (!response.data.items.length)
                return {error: true, message: 'Video stats not found'}

            const firstVideoData = response.data.items[0].snippet;
            const firstVideoStats = response.data.items[0].statistics;

            return {
                error: false,
                data: {
                    channelTitle: firstVideoData.channelTitle,
                    title: firstVideoData.title,
                    description: firstVideoData.description,
                    thumbnailUrl: firstVideoData.thumbnails.high.url,
                    stats: firstVideoStats
                }
            }
        } catch (e: any) {
            return {
                error: true,
                message: e.message,
            }
        }
    }

    static async getComments(videoName: string) {
        try {
            let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${videoName}&key=${process.env.YOUTUBE_API_KEY}`);

            if (!response.data.items.length)
                return {error: true, message: 'Video name not found'}

            const videoId = response.data.items[0].id.videoId;

            response = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=4&textFormat=plainText&videoId=${videoId}&key=${process.env.YOUTUBE_API_KEY}`);

            if (!response.data.items.length)
                return {error: true, message: 'Video name not found'}

            let data = response.data.items.map((commentObj: any) => commentObj.snippet.topLevelComment.snippet.textDisplay);

            return {
                error: false,
                data: data
            };
        } catch (e: any) {
            return {
                error: true,
                message: e.message
            };
        }

    }
}

export default YoutubeService;
