import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Header =({msg})=>{
    return(
    <h2 className="Header text-center">
    {msg}</h2>
    );
};

Header.propTypes={
    msg: PropTypes.string
};

const App =()=>{
    return(
        <div>
        <Header msg="Naming Contests"/>
        <div>
            ....
        </div>
        </div>
    );
};


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);