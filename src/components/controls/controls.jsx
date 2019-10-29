import React, {useState, useEffect, memo} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {setNodesPos, buildListAdi, buildNode}  from '@A'

const Controls = memo(() => {
  const [state, setState] = useState({cnt: 10, radius: 300})
  const dispatch = useDispatch()
  const colorGraph = useSelector(({colorGraph}) => colorGraph)
  const colors = Object.keys(colorGraph).reduce((acc, cur) => acc.includes(colorGraph[cur]) ? acc : [...acc, colorGraph[cur]], [])
  useEffect(() => {
    dispatch(setNodesPos(state))
    // eslint-disable-next-line
  }, [state])
  const onChange = (event) => {
    const {name, value} = event.target
    if(name === 'cnt')  setState({...state, cnt: value})
    if(name === 'radius') setState({...state, radius: value})
  }

  return (
    <div>
      <input type="range" name="cnt" min="1" max="50" value={state.cnt} onChange={onChange}/>
      <input type="range" name="radius" min="100" max="500" value={state.radius} onChange={onChange}/> 
      <h1>{colors.length}</h1>
      <button onClick={() => dispatch(buildListAdi())}>Click me</button>
      <button onClick={() => dispatch(buildNode())}>Create node</button>
    </div>
  )
})

export default Controls
