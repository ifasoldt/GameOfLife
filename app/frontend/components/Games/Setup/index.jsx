import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Dropdown from 'components/Dropdown/index.jsx'
import GameBoard from 'components/Games/GameBoard/index.jsx'

export default class Setup extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      boardSize: { name: '20x20', value: 20 },
      boardValuesArray: this.buildNewBoardValues(20)
    }
    this.onSelect = this.onSelect.bind(this)
    this.toggleCell = this.toggleCell.bind(this)
  }

  onSelect(boardSize) {
    this.setState({
      boardSize: boardSize,
      boardValuesArray: this.buildNewBoardValues(boardSize.value)
    })
  }

  toggleCell(rowIndex, cellIndex) {
    let newBoardValuesArray = _.cloneDeep(this.state.boardValuesArray)
    const oldValue = newBoardValuesArray[rowIndex][cellIndex]
    newBoardValuesArray[rowIndex].splice(cellIndex, 1, !oldValue )
    this.setState({ boardValuesArray: newBoardValuesArray })
  }

  buildNewBoardValues(number) {
    return _.times(number, () => _.times(number, () => false) )
  }

  buildDropdownOptionsArray() {
    return _.map(_.range(2, 21), number => (
      { name: `${number}x${number}`, value: number }
    ))
  }

  render() {
    const { createGame } = this.props
    return (
      <div style={styles.container}>
        <div style={styles.gameControls}>
          <div style={styles.dropdownContainer}>
            <div style={styles.dropdownLabel}>Board Size</div>
            <Dropdown
              dropdownArray={this.buildDropdownOptionsArray()}
              onSelect={this.onSelect}
              selectedOption={this.state.boardSize}
            />
          </div>
          <div className="btn btn-secondary" onClick={() => createGame(this.state.boardValuesArray)}>
            Initialize Game
          </div>
        </div>
        <GameBoard
          boardValuesArray={this.state.boardValuesArray}
          toggleCell={this.toggleCell}
          interactive={true}
        />
      </div>
    )
  }

}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'Column',
    padding: '8px',
    overflow: 'auto',
  },
  gameControls: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '4px'
  },
  dropdownContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownLabel: {

  }
}
