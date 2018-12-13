import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Dropdown from 'components/Dropdown/index.jsx'
import GameBoard from 'components/Games/GameBoard/index.jsx'

export default class Simulation extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      playing: false
    }
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
  }

  play() {
    this.setState({
      playing: true
    })
  }

  pause() {
    this.setState({
      playing: false
    })
  }

  render() {
    const { advanceGame, game } = this.props
    return (
      <div style={styles.container}>
        <div style={styles.gameControls}>
          <i style={styles.icons} class="material-icons" onClick={this.goBack}>settings_backup_restore</i>
          {
            this.state.playing ?
              <i style={styles.icons} class="material-icons" onClick={this.pause}>pause_circle_outline</i>
            :
              <i style={styles.icons} class="material-icons" onClick={this.play}>play_circle_outline</i>
          }
          <i style={styles.icons} class="material-icons" onClick={advanceGame}>arrow_forward</i>
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
    flexGrow: 1,
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
  icons: {
    fontSize: '40px',
    cursor: 'pointer'
  }
}
