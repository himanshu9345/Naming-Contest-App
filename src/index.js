import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const App =(props)=>{
    return(
        <h2 className="text-center">
            {props.msg}
        </h2>
    );
};

App.propTypes={
    msg: PropTypes.string
};

App.defaultProps={
    msg:"Himanshu!!!"
};

ReactDOM.render(
    <App msg="gg"/>,
    document.getElementById('root')
);