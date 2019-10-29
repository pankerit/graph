import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'

import {buildEdge as setNewEdge, buildEdgeStart}  from '@A'
import Node from '@C/node'
import Edge from '@C/edge'
import Controls from '@C/controls'

const Graph = () => {
  const [pos, setPos] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('mousemove', (e) => setPos([e.pageX, e.pageY]))
  }, [setPos])

  const nodes = useSelector(state => state.nodes)
  const edges = useSelector(state => state.edges)
  const buildEdge = useSelector(state => state.buildEdge)

  const onMouseUp = () => {
    if ((buildEdge.startNode || buildEdge.startNode === 0) && (buildEdge.endNode || buildEdge.endNode === 0)) dispatch(setNewEdge())
    else dispatch(buildEdgeStart({pos: null}))
  }
  // console.log(buildEdge)

  return (
    <StyledGraph onMouseUp={onMouseUp}>
      <Controls />
      {
        nodes.map((el, key) => <Node pos={el} key={key} idx={key}/>)
      }
      {
        edges.map((el, key) => <Edge posStart={nodes[el[0]]} posEnd={nodes[el[1]]} key={key} idx={key}/>)
      }
      {
        buildEdge.posStart && <Edge posStart={buildEdge.posStart} posEnd={buildEdge.posEnd ? buildEdge.posEnd : pos}/>
      }
    </StyledGraph>
  )
}


export default Graph


const StyledGraph = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

