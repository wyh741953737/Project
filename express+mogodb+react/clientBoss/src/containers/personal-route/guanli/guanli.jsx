import React, { Component } from 'react'
import { connect }from 'react-redux'
class Guanli extends Component {
  render() {
    return (
      <div>
        Guanli
      </div>
    )
  }
}
export default connect(
  state => ({}),
  {}
)(Guanli)