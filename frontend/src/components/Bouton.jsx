import React from 'react'

function Bouton(props) {
  return (
    <button className={`${props.width} ${props.bg} ${props.color} ${props.fontSize}  px-4 py-4 rounded-md`}>Se connecter</button>
  )
}

export default Bouton