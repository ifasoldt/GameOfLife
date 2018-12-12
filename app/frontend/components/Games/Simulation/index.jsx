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
    const { advance, game } = this.props
    return (
      <div style={styles.container}>
        <div style={styles.gameControls}>
          <i style={styles.icons} class="material-icons" onClick={this.goBack}>arrow_back</i>
          {
            this.state.playing ?
              <i class="material-icons" onClick={this.pause}>pause_circle_outline</i>
            :
              <i style={styles.icons} class="material-icons" onClick={this.play}>play_circle_outline</i>
          }
          <i style={styles.icons} class="material-icons" onClick={this.advance}>arrow_forward</i>
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
  icons: {
    fontSize: '60px',
    cursor: 'pointer'
  }
}
