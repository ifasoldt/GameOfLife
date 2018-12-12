import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

export default class Cell extends React.PureComponent {

  render() {
    const { cellIndex, value } = this.props
    return (
      <div style={styles.cell(value)}>
      </div>
    )
  }

}

const styles = {
  cell: value => ({
    height: '40px',
    width: '40px',
    color: value ? 'black' : 'white',
    border: '1px solid black'
  })
}
