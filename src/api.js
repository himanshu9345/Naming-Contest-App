//to fetch api results from api 
import axios  from 'axios';

export const fetchContest = contestId => {
    return axios.get(`/api/contests/${contestId}`)
        .then(resp=>resp.data)
}