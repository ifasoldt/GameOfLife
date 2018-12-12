import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Dropdown from 'components/Dropdown/index.jsx'
import GameBoard from 'components/Games/GameBoard/index.jsx'

export default class Simulation extends React.PureComponent {

  constructor(props) {
    super(props)
  }

  render() {
    const { game } = this.props

    return (
      <div style={styles.container}>
        <div style={styles.gameControls}>
        </div>
        <GameBoard
          boardValuesArray={game.current_board}
          interactive={false}
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
