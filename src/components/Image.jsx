import React from 'react'

function Image(props) {
  return (
    <img 
      src={props.src}
      alt={props.alt}
      className={`w-${props.width} h-${props.height} object-cover`}
    />
  )
}
export default Image