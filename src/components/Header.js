import React from 'react'
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

export default Header;