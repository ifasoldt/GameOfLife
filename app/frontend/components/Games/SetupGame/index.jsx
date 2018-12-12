import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Dropdown from 'components/Dropdown/index.jsx'
import GameBoard from 'components/Games/GameBoard/index.jsx'

export default class SetupGame extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      boardSize: {name: '20x20', value: 20}
    }
    this.onSelect = this.onSelect.bind(this)
  }

  onSelect(boardSize) {
    this.setState({boardSize: boardSize})
  }

  render() {

    const dropdownOptionsArray = _.map(_.range(2, 21), number => (
      { name: `${number}x${number}`, value: number }
    ))
    let boardValuesArray = _.times(this.state.boardSize.value, () => _.times(this.state.boardSize.value, () => false) )
    return (
      <div style={styles.container}>
        <div style={styles.dropdownLabel}>Choose Game Board Size</div>
        <Dropdown
          dropdownArray={dropdownOptionsArray}
          onSelect={this.onSelect}
          selectedOption={this.state.boardSize}
        />
        <GameBoard
          boardValuesArray={boardValuesArray}
        />
      </div>
    )
  }

}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'Column',
    flexBasis: '80%',
    padding: '8px',
    overflow: 'auto',
    alignItems: 'center'
  },
  dropdownLabel: {

  }
}
