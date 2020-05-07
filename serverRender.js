//fetch data from the api
import config from './config';
import axios from 'axios';
import App from './src/components/App';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

//getting api data based on consted id
const getApiUrl = (contestId) =>{
    if (contestId){
        return `${config.serverUrl}/api/contest/${contestId}`;
    
    }
    return `${config.serverUrl}/api/contests`
}

//return data for single contest
const getInitialData = (contestId,apiData)=>{
    
    if(contestId){
        return {
            currentContestId: apiData._id,
            contests: {
                [apiData._id]: apiData
            }
        };
    }
    return {
        contests:apiData.contests
    };
}; 


const serverRender = (contestId) =>
axios.get(getApiUrl(contestId))
    .then(resp => {
        // console.log(resp.data);
        const initialData = getInitialData(contestId,resp.data)
        return{
            initialMarkup: ReactDOMServer.renderToString(
                <App initialData={initialData} />
                ),
            initialData

        };
        
       
    });

export default serverRender;