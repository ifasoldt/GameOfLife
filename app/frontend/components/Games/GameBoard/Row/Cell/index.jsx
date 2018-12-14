import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

export default class Cell extends React.PureComponent {

  render() {
    const { cellIndex, cellSize, interactive, toggleCell, value } = this.props
    return (
      <div style={styles.cell(value, cellSize)} onClick={interactive ? () => toggleCell(cellIndex) : () => {}}>
      </div>
    )
  }

}

const styles = {
  cell: (value, cellSize) => ({
    height: cellSize == 'large' ? '32px' : '4px',
    width: cellSize == 'large' ? '32px' : '4px',
    backgroundColor: value ? 'black' : 'white',
    border: cellSize == 'large' ? '1px solid black' : 'none'
  })
}

Cell.propTypes = {
  cellIndex: PropTypes.number.isRequired,
  cellSize: PropTypes.string.isRequired,
  interactive: PropTypes.bool.isRequired,
  toggleCell: PropTypes.func,
  value: PropTypes.bool.isRequired
}
