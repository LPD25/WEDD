  import React from 'react'

function Title(props) {

    
  return (
    <div>
      <h1 className={`${props.fontSize} ${props.fontWeight} ${props.color} `}>
    {props.children}
      </h1>
    </div>
  )
}

  export default Title