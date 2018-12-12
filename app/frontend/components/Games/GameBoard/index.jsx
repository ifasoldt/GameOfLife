import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Row from './Row/index.jsx'

export default class GameBoard extends React.PureComponent {



  render() {
    const { boardValuesArray } = this.props
    const rows = _.map(boardValuesArray, (boardValuesRow, rowIndex) => {
      return <Row rowValues={boardValuesRow} rowIndex={rowIndex} />
    })
    return (
      <div style={styles.gameBoardContainer}>
        {rows}
      </div>
    )
  }

}

const styles = {
  gameBoardContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid gray'
  }
}
