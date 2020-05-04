//fetch data from the api
import config from './config';
import axios from 'axios';
import App from './src/components/App';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const serverRender = () =>
axios.get(`${config.serverUrl}/api/contests`)
    .then(resp => {
        // console.log(resp.data);
        return{
            initialMarkup: ReactDOMServer.renderToString(
                <App initialContests={resp.data.contests} />
                ),
            initialData: resp.data

        };
        
       
    })

export default serverRender;