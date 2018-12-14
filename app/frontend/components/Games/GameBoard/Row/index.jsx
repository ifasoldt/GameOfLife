import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Cell from './Cell/index.jsx'

export default class Row extends React.PureComponent {

  constructor(props) {
    super(props)
    this.toggleCell = this.toggleCell.bind(this)
  }

  toggleCell(cellIndex) {
    this.props.toggleCell(this.props.rowIndex, cellIndex)
  }


  render() {
    const { cellSize, interactive, rowValues } = this.props
    const cells = _.map(rowValues, (value, cellIndex) =>{
      return (
        <Cell
          value={value}
          cellIndex={cellIndex}
          toggleCell={this.toggleCell}
          interactive={interactive}
          cellSize={cellSize}
        />
      )
    })
    return (
      <div style={styles.row}>
        {cells}
      </div>
    )
  }

}

const styles = {
  row: {
    display: 'flex'
  }
}

Row.propTypes = {
  cellSize: PropTypes.string.isRequired,
  interactive: PropTypes.bool.isRequired,
  rowIndex: PropTypes.number.isRequired,
  rowValues: PropTypes.array.isRequired,
  toggleCell: PropTypes.func
}
