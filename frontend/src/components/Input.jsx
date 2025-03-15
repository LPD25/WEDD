import React from 'react'

function Input(props) {
  return (
    <div>
      <input
        type={props.type}
        className={`${props.width} px-4 py-3 border border-[#C6C6C6] rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        placeholder={props.placeholder}
        name={props.name}
        required={props.required}
      />
    </div>
  );
}
export default Input