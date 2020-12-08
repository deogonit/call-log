import request from "superagent";
import {baseUrl} from "../config/constant";

export default class CallLogService {

    _apiBase = baseUrl

    getRequest = (url) => {
        return request
            .get(`${this._apiBase}${url}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Could not send get request to ${url}, received ${response.status}`);
                }
                return response.body;
            });
    }

    postRequest = (url, data) => {
        return request
            .post(`${this._apiBase}${url}`)
            .send(data)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Could not send post request to ${url} with data ${data}, received ${response.status}`);
                }
                return response.body;
            });
    }

    getAllLogs = (pageNumber = 1) => {
        const response = this
            .getRequest(`/logs?page=${pageNumber}`)
        return this._transformResponse(response)
    }

    getFilteringLogs = (filters = {}, pageNumber = 1) => {
        const response = this.postRequest(`/logs?page=${pageNumber}`, {filters: filters});
        return this._transformResponse(response)
    }

    _transformResponse = (response) => {
        return response.then(body => {
            return {
                logs: body.logs,
                page: body.page,
                pages: body.pages,
                totalLogs: body.total,
                postsPerPage: body.size
            }
        })
    };
}