import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

export default class Cell extends React.PureComponent {

  render() {
    const { cellIndex, interactive, toggleCell, value } = this.props
    return (
      <div style={styles.cell(value)} onClick={interactive ? () => toggleCell(cellIndex) : () => {}}>
      </div>
    )
  }

}

const styles = {
  cell: value => ({
    height: '32px',
    width: '32px',
    backgroundColor: value ? 'black' : 'white',
    border: '1px solid black'
  })
}
