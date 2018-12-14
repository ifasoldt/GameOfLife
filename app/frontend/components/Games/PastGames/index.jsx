import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import GameBoard from 'components/Games/GameBoard/index.jsx'

export default class PastGames extends React.PureComponent {

  buildPastGamesComponents() {
    return _.map(this.props.pastGames, (pastGame) => {
      return (
        <div style={styles.pastGame} onClick={() => this.props.getGame(pastGame.id)}>
          <div style={styles.gameNumber}>{pastGame.id}</div>
          <GameBoard
            boardValuesArray={pastGame.current_board}
            interactive={false}
            cellSize={'small'}
          />
        </div>
      )
    })
  }

  render() {
    const { getNextGames, getPreviousGames, pastGames } = this.props
    return (
      <div style={styles.pastGamesContainer}>
        <div style={styles.title}>Past Games</div>
        <div style={styles.changePage}>
          <div style={styles.button} className="btn btn-secondary" onClick={getPreviousGames} >previous</div>
          <div style={styles.button} className="btn btn-secondary" onClick={getNextGames} >next</div>
        </div>
        {this.buildPastGamesComponents()}
      </div>
    )
  }

}

const styles = {
  pastGamesContainer: {
    flexBasis: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: '1',
    padding: '32px'
  },
  title: {
    display: 'flex',
    fontSize: '24px',
    fontWeight: '500',
    justifyContent: 'flex-end',
    marginBottom: '8px'
  },
  pastGame: {
    height: '100px',
    width: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    cursor: 'pointer'
  },
  gameNumber: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 600,
  },
  changePage: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginRight: '12px'
  }
}

PastGames.propTypes = {
  getGame: PropTypes.func.isRequired,
  getNextGames: PropTypes.func.isRequired,
  getPreviousGames: PropTypes.func.isRequired,
  pastGames: PropTypes.array.isRequired
}
