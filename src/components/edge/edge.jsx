import React, {memo} from 'react'
import {connect} from 'react-redux'
import {deleteEdge} from '@A'

const pi = Math.PI

const Edge = memo(({ posStart, posEnd, idx, deleteEdge }) => {
  const cateta1 = Math.abs(posStart[0] - posEnd[0])
  const cateta2 = Math.abs(posStart[1] - posEnd[1])
  const width=Math.sqrt(cateta1*cateta1 + cateta2*cateta2)
  let ang = Math.atan((posEnd[1]-posStart[1])/(posEnd[0]-posStart[0]))
  if (posEnd[0] < posStart[0]) {
    ang = ang - pi
  }


  const onClick = () => {
    deleteEdge(idx)
  }

  const style = {
    left: posStart[0]+'px',
    top: posStart[1]+'px',
    width: width + 'px',
    transform: `rotate(${ang}rad)`,
    
  }
  return (
    <div  className="edge" 
          onClick={onClick}
          style={style}>
      
    </div>
  )
})

export default connect(undefined, {deleteEdge})(Edge)
