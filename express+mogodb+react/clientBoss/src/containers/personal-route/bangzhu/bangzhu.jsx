import React, { Component } from 'react'
import { connect }from 'react-redux'
 class BangZhu extends Component {
  render() {
    return (
      <div>
        BangZhu
      </div>
    )
  }
}
export default connect(
  state => ({}),
  {}
)(BangZhu)