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
    return _.map(_.range(4, 21), number => (
      { name: `${number}x${number}`, value: number }
    ))
  }

  render() {
    const { createGame } = this.props
    return (
      <div style={styles.container}>
        <div style={styles.leftColumn}>
          <div style={styles.pageTitle}>
            Setup Game
          </div>
          <div style={styles.gameControls}>
            <div style={styles.dropdownContainer}>
              <div style={styles.dropdownLabel}>Board Size</div>
              <Dropdown
                dropdownArray={this.buildDropdownOptionsArray()}
                onSelect={this.onSelect}
                selectedOption={this.state.boardSize}
              />
            </div>
            <div style={styles.initializeButton} className="btn btn-secondary" onClick={() => createGame(this.state.boardValuesArray)}>
              Initialize Game
            </div>
          </div>
        </div>
        <div style={styles.rightColumn}>
          <div style={styles.helperText}>
            Click on grid cells to setup an initial pattern, or choose a pre-set pattern on the left.
          </div>
          <GameBoard
            boardValuesArray={this.state.boardValuesArray}
            toggleCell={this.toggleCell}
            interactive={true}
            cellSize={'large'}
          />
        </div>

      </div>
    )
  }

}

const styles = {
  container: {
    display: 'flex',
    padding: '8px',
    overflow: 'auto',
    flexGrow: '1'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '20%',
    padding: '24px'
  },
  rightColumn: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: '24px'
  },
  pageTitle: {
    display: 'flex',
    fontSize: '24px',
    fontWeight: '500',
    justifyContent: 'flex-end'
  },
  gameControls: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px',
    alignItems: 'flex-end'
  },
  dropdownContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '8px'
  },
  initializeButton: {
    marginTop: '8px'
  }
}
