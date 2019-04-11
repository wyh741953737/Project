import React, { Component } from 'react'
import { connect }from 'react-redux'
class JingCha extends Component {
  render() {
    return (
      <div>
        JingCha
      </div>
    )
  }
}
export default connect(
  state => ({}),
  {}
)(JingCha)