import React, { Component } from 'react'
import { connect }from 'react-redux'
class Wei extends Component {
  render() {
    return (
      <div>
        Wei
      </div>
    )
  }
}
export default connect(
  state => ({}),
  {}
)(Wei)