import React from 'react';

const Header = (props) => {
  return(
    <header>
      <h1 className="text-center"><span className="fab fa-bitcoin"></span>  {props.titulo} </h1>
    </header>
  );
};

export default Header;