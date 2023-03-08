import React from 'react'

const Message = () => {
  return (
    <div className='message owner'>

      <div className="messageInfo">
      <img src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
      <span>just now </span>
      </div>
      <div className="messageContent">
        <p>Hello</p>

      </div>
    </div>
  )
}

export default Message