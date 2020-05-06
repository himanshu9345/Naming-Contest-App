//to fetch api results from api 
import axios  from 'axios';

export const fetchContest = contestId => {
    return axios.get(`/api/contest/${contestId}`)
        .then(resp=>resp.data)
}