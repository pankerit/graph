import store from '../index'

const setNodesPos = ({ cnt, radius }) => {
  const arr = []
  const { sin, cos } = Math
  const pi = Math.PI

  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  const degToRad = (angle) => angle * pi / 180
  for (let i = 0; i < cnt; i++) {
    const x = centerX + sin(i * degToRad(360 / cnt)) * radius
    const y = centerY + cos(i * degToRad(360 / cnt)) * radius
    arr.push([x, y])
  }
  return { type: 'SET_NODES_POS', payload: arr }
}

const setNodePos = (payload) => ({ type: "SET_NODE_POS", payload })
const buildNode = () => ({ type: "BUILD_NODE", payload: [100, 100] })

const buildEdgeStart = (payload) => ({ type: "BUILD_EDGE_START", payload })
const buildEdgeEnd = (payload) => ({ type: "BUILD_EDGE_END", payload })
const buildEdge = () => ({ type: "BUILD_EDGE" })
const deleteEdge = (payload) => ({ type: "DELETE_EDGE", payload })

const buildListAdi = () => {
  const { edges } = store.getState()
  const Graph = {}

  edges.forEach(([v1, v2]) => {
    if (!(v1 in Graph)) {
      Graph[v1] = {}
    }
    if (!(v2 in Graph)) {
      Graph[v2] = {}
    }
    if (v1 in Graph) {
      Object.assign(Graph[v1], { [v2]: {} })
    }
    if (v2 in Graph) {
      Object.assign(Graph[v2], { [v1]: {} })
    }
  })
  /* eslint-disable */
  const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  // debugger
  // console.log(JSON.stringify(Graph, null, 2))
  const sortedGraph = Object.keys(Graph).sort((a, b) => {
    return Object.keys(Graph[b]).length - Object.keys(Graph[a]).length
  })


  for (let vertex of sortedGraph) {
    const color = []
    for (let adiacent in Graph[vertex]) {
      if (!(Graph[adiacent].color === undefined)) color.push(Graph[adiacent].color)
    }
    for (let el of colors) {
      if (!color.includes(el)) {
        Graph[vertex].color = el
        break
      }
    }

  }
  const graphColor = Object.keys(Graph).reduce((acc, cur) => {
    acc[cur] = Graph[cur].color
    return acc
  }, {})
  return { type: "SET_GRAPH_COLOR", payload: graphColor }
  /* eslint-enable */

}

export {
  setNodesPos,
  setNodePos,
  buildNode,
  buildEdgeStart,
  buildEdgeEnd,
  buildEdge,
  deleteEdge,
  buildListAdi
}