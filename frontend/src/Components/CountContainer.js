import React from 'react'

const CountContainer = (props) => {
  return (
    <>
      <div className='count-wrapper shadow'>
 
           <div>
              <h3>{props.count}</h3>
           </div>
           <div>
              <h4>{props.type}</h4>
           </div>
 
      </div>
    </>
  )
}

export default CountContainer
