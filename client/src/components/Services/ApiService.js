import axios from "axios";

export class ApiService {
    static async clientWrapper(path = '/', needAuth = false, method = 'get', data = null) {
        const reqSettings = {
            method: method,
            url: `${process.env.REACT_APP_API_URL}${path}`,
        }
        if (data)
            reqSettings.data = data;
        if (needAuth) {
            const accessToken = localStorage.getItem('accessToken');
            reqSettings.headers = {Authorization: `Bearer ${accessToken}`}
        }

        return axios(reqSettings);
    }
}
