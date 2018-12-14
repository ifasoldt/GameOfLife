import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Row from './Row/index.jsx'

export default class GameBoard extends React.PureComponent {

  render() {
    const { boardValuesArray, cellSize, interactive, toggleCell } = this.props
    const rows = _.map(boardValuesArray, (boardValuesRow, rowIndex) => {
      return (
        <Row
          rowValues={boardValuesRow}
          rowIndex={rowIndex}
          toggleCell={toggleCell}
          interactive={interactive}
          cellSize={cellSize}
        />
      )
    })
    return (
      <div style={styles.gameBoardContainer}>
        <div style={styles.gameBoard}>
          {rows}
        </div>

      </div>
    )
  }

}

const styles = {
  gameBoardContainer: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  gameBoard: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid gray',
    alignItems: 'center'
  }
}
