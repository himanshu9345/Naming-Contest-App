import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import data from "./testData.json"
console.log(data.contests)


ReactDOM.render(
    <App contests={data.contests}/>,
    document.getElementById('root')
);