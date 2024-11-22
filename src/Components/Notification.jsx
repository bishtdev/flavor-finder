import React from 'react'

const Notification = ({message , onClose}) => {
  return (
    <div className="fixed top-4 right-4 bg-[#00853E] text-white p-4 rounded shadow-lg z-50">
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-white font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default Notification