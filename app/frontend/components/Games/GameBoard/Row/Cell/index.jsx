import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

export default class Cell extends React.PureComponent {

  render() {
    const { cellIndex, toggleCell, value } = this.props
    debugger
    return (
      <div style={styles.cell(value)} onClick={() => toggleCell(cellIndex)}>
      </div>
    )
  }

}

const styles = {
  cell: value => ({
    height: '40px',
    width: '40px',
    backgroundColor: value ? 'black' : 'white',
    border: '1px solid black'
  })
}
