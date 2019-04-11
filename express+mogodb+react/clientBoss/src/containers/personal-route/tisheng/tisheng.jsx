import React, { Component } from 'react'
import { connect }from 'react-redux'
 class TiSheng extends Component {
  render() {
    return (
      <div>
        Tisheng
      </div>
    )
  }
}
export default connect(
  state => ({}),
  {}
)(TiSheng)