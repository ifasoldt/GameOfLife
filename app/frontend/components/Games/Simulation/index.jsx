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
    this.advanceGame = this.advanceGame.bind(this)
    this.resetGame = this.resetGame.bind(this)
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

  advanceGame(){
    this.setState({
      playing: false
    })
    this.props.advanceGame()
  }

  resetGame() {
    this.setState({
      playing: false
    })
    this.props.resetGame()
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

  calculateLiveCells(){
    return this.props.game.current_board.reduce((accumulator, value) => accumulator + (value.filter(i => i).length), 0)
  }

  render() {
    const { advanceGame, game, newGame, resetGame } = this.props
    return (
      <div style={styles.container}>
        <div style={styles.leftColumn}>
          <div style={styles.gameControl} className="btn btn-secondary" onClick={newGame}>
            New Game
          </div>
          <div style={styles.gameControl} className="btn btn-secondary" onClick={this.resetGame}>
            <div style={styles.innerButton}>Reset<i style={styles.icons} className="material-icons">settings_backup_restore</i></div>
          </div>
          <div style={styles.gameControl} className="btn btn-secondary" onClick={this.state.playing? this.pause : this.play}>
            {
              this.state.playing ?
                <div style={styles.innerButton}>Pause<i style={styles.icons} className="material-icons">pause_circle_outline</i></div>
              :
                <div style={styles.innerButton}>Play<i style={styles.icons} className="material-icons">play_circle_outline</i></div>
            }
          </div>
          <div style={styles.gameControl} className="btn btn-secondary" onClick={this.advanceGame}>
            <div style={styles.innerButton}>Forward <i style={styles.icons} className="material-icons">arrow_forward</i></div>
          </div>
          <div style={styles.stats}>
            <div style={styles.statName}>
              Alive Cells:
            </div>
            <div style={styles.statValue}>
              {this.calculateLiveCells()}
            </div>
          </div>
          <div style={styles.stats}>
            <div style={styles.statName}>
              Generation:
            </div>
            <div style={styles.statValue}>
              {game.stage}
            </div>
          </div>
        </div>
        <div style={styles.rightColumn}>
          <GameBoard
            boardValuesArray={game.current_board}
            interactive={false}
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
    cursor: 'pointer',
    marginLeft: '4px'
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
  },
  stats: {
    marginTop: '8px',
    fontSize: '18px',
    display: 'flex',
    width: '120px',
    justifyContent: 'space-between'
  },
  statName: {
    fontWeight: '600'
  }
}

Simulation.propTypes = {
  advanceGame: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  newGame: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired
}
