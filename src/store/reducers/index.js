const initialState = {
  nodeSize: 0,
  nodeCnt: 20,
  nodes: [],
  edges: [],
  buildEdge: {
    posStart: null,
    posEnd: null,
  },
  colorGraph: {}
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {

    case 'SET_NODES_POS':
      return {
        ...state,
        nodes: payload
      }

    case 'SET_NODE_POS': {
      const { pos, idx } = payload
      const newArr = [...state.nodes]
      newArr[idx] = pos
      return { ...state, nodes: newArr }
    }

    case "BUILD_NODE": {
      const newArr = [...state.nodes, payload]
      return { ...state, nodes: newArr }
    }

    case "BUILD_EDGE_START":
      return {
        ...state, buildEdge: { ...state.buildEdge, posStart: payload.pos, startNode: payload.idx }
      }

    case "BUILD_EDGE_END":
      return {
        ...state, buildEdge: { ...state.buildEdge, posEnd: payload ? payload.pos : null, endNode: payload ? payload.idx : null }
      }

    case "BUILD_EDGE":
      const { startNode, endNode } = state.buildEdge
      if (startNode === endNode)
        return { ...state, buildEdge: { posStart: null } }

      return {
        ...state, edges: [...state.edges, [startNode, endNode]], buildEdge: { posStart: null }
      }
    case "DELETE_EDGE":
      const edges = state.edges.filter((_, idx) => !(idx === payload))
      return { ...state, edges }

    case "SET_GRAPH_COLOR": {
      return {
        ...state, colorGraph: payload
      }
    }

    default:
      return state
  }
}

export default reducer