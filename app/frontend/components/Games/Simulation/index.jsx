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

  componentDidUpdate() {
    if (this.state.playing) {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.props.advanceGame(), 500);
    } else {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    // prevent memory leaks
    clearInterval(this.interval);
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
        <div style={styles.leftColumn}>
          <div style={styles.gameControl} className="btn btn-secondary" onClick={this.goBack}>
            <div style={styles.innerButton}><i style={styles.icons} class="material-icons">settings_backup_restore</i>Reset</div>
          </div>
          <div style={styles.gameControl} className="btn btn-secondary" onClick={this.state.playing? this.pause : this.play}>
            {
              this.state.playing ?
                <div style={styles.innerButton}><i style={styles.icons} class="material-icons">pause_circle_outline</i>Pause</div>
              :
                <div style={styles.innerButton}><i style={styles.icons} class="material-icons">play_circle_outline</i>Play</div>
            }
          </div>
          <div style={styles.gameControl} className="btn btn-secondary" onClick={advanceGame}>
            <div style={styles.innerButton}><i style={styles.icons} class="material-icons">arrow_forward</i>Forward</div>
          </div>
        </div>
        <div style={styles.rightColumn}>
          <GameBoard
            boardValuesArray={game.current_board}
            interactive={false}
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
    flexGrow: 1
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '20%',
    padding: '24px',
    alignItems: 'flex-end'
  },
  rightColumn: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: '24px'
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
    fontSize: '20px',
    cursor: 'pointer'
  },
  gameControl: {
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px'
  },
  innerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
