import React from 'react'
import Hourglass  from './Hourglass.gif';
const Spinner=()=> {
  
    return (
      <div className='text-center'>
        <img src={Hourglass} alt="wait"/>
      </div>
    )
  
}

export default Spinner
