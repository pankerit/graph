import React, {Component} from 'react'
import {connect} from 'react-redux'

import {setNodePos, buildEdgeStart, buildEdgeEnd} from '@A'

class Node extends Component {

  state = {
    isDoubleClick: false
  }

  setXY = (e) => {
    const idx = this.props.idx
    const pos = [e.pageX, e.pageY]
    this.props.setNodePos({idx, pos})
  }
  

  enableEvent = () => {
    if (this.state.isDoubleClick) window.addEventListener('mousemove', this.setXY)
    else {
      this.props.buildEdgeStart({pos: this.props.pos, idx: this.props.idx})
    }
  }
  
  removeEvent = () => window.removeEventListener('mousemove', this.setXY)

  onClick = () => {
    this.setState({isDoubleClick: true})
    setTimeout(() => {
      this.setState({isDoubleClick: false})
    }, 200)
  }

  render() {
    const [x,y] = this.props.pos
    const {idx, colorGraph} = this.props
    let bgc
    switch(colorGraph[idx]) {
      case 0: 
        bgc = 'red'
        break
      case 1:
        bgc = 'green'
        break
      case 2:
        bgc = 'blue'
        break
      case 3:
        bgc = 'yellow'
        break
      case 4:
        bgc = 'chocolate'
        break
      case 5:
        bgc = 'aqua'
        break
      case 6:
        bgc = 'purple '
        break
      case 7:
        bgc = 'pink'
        break
      case 8:
        bgc = 'fuchsia '
        break
      default: 
        bgc = 'black'
    }
    const style = {
      top: `${y}px`,
      left: `${x}px`,
      background: bgc
    }
    return (
      <button  className="node" onClick={this.onClick}
               onMouseDown={this.enableEvent} 
               onMouseUp={this.removeEvent}
               onMouseEnter={() => this.props.buildEdgeEnd({pos: [x,y], idx: this.props.idx})} 
               onMouseLeave={() => this.props.buildEdgeEnd(null)}
               style={style}>
        {this.props.idx}
      </button>
    )
  }
}


const mapStateToPorps = (state) => ({colorGraph: state.colorGraph})
export default connect(mapStateToPorps, {setNodePos, buildEdgeStart, buildEdgeEnd})(Node)