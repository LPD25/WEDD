import React from 'react';

function Title(props) {
  return (
    <h1 className={`${props.fontSize} ${props.fontWeight} ${props.color} `}>
      {props.children}
    </h1>
  );
}

export default Title;
