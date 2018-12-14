import PropTypes from 'prop-types'
import React from 'react'

import Api from 'helpers/Api'
import PastGames from './PastGames/index.jsx'
import Routes from 'helpers/Routes'
import Setup from './Setup/index.jsx'
import Simulation from './Simulation/index.jsx'

const PAGES = {
  setup: "setup",
  simulation: "simulation"
}

export default class Games extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      game: {},
      page: PAGES.setup,
      pastGames: [],
      pastGamesPageNumber: 1
    }
    this.createGame = this.createGame.bind(this)
    this.advanceGame = this.advanceGame.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.getPastGames = this.getPastGames.bind(this)
    this.getGame = this.getGame.bind(this)
    this.getPreviousGames = this.getPreviousGames.bind(this)
    this.getNextGames = this.getNextGames.bind(this)
  }

  componentDidMount() {
    this.getPastGames(1)
  }

  getPage() {
    switch (this.state.page) {
      case PAGES.setup:
        return <Setup createGame={this.createGame} />
        break;
      case PAGES.simulation:
        return  <Simulation
                  game={this.state.game}
                  advanceGame={this.advanceGame}
                  resetGame={this.resetGame}
                />
      default:
        return <Setup createGame={this.createGame} />
    }
  }

  createGame(boardValues) {
    Api.post(Routes.games(), this.buildGameObject(boardValues))
      .then((game) => {
        this.setState(
          ({
            page: PAGES.simulation,
            game: game
          })
        )
      })
      .catch(() => {
        // big error message :p
      })
  }

  advanceGame() {
    Api.put(Routes.advanceGame(this.state.game.id), {})
      .then((game) => {
        this.setState(
          ({
            game: game
          })
        )
      })
      .catch(() => {
        // big error message :p
      })
  }

  resetGame() {
    Api.put(Routes.resetGame(this.state.game.id), {})
      .then((game) => {
        this.setState(
          ({
            game: game
          })
        )
      })
      .catch(() => {
        // big error message :p
      })
  }

  getPastGames(pageNumber) {
    Api.get(Routes.games(pageNumber))
      .then((games) => {
        this.setState(
          ({
            pastGames: games,
            pastGamesPageNumber: pageNumber
          })
        )
      })
      .catch(() => {
        // big error message :p
      })
  }

  getGame(gameId) {
    Api.get(Routes.game(gameId))
      .then((game) => {
        debugger
        this.setState(
          ({
            page: PAGES.simulation,
            game: game
          })
        )
      })
      .catch(() => {
        // big error message :p
      })
  }


  // TODO build full functional pagination (ie don't let the user ask for pages that don't exist lol)
  getPreviousGames() {
    this.getPastGames(this.state.pastGamesPageNumber - 1)
  }

  getNextGames() {
    this.getPastGames(this.state.pastGamesPageNumber + 1)
  }

  // Thought about putting the game object from the Setup component as the game object in state.
  // Pros: Consistent code--same structure to Setup and Simulation with how they handle state.
  // Cons: all of the setup logic would end up in this component.
  // Redux would fix this.
  // I think if I did it again, I would move the game object into state here.
  buildGameObject(boardValues) {
    return {
      initial_board: boardValues,
      current_board: boardValues
    }
  }


  render() {

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          Conway's Game Of Life
        </div>
        <div style={styles.main}>
          {this.getPage()}
          <PastGames
            pastGames={this.state.pastGames}
            getGame={this.getGame}
            getPreviousGames={this.getPreviousGames}
            getNextGames={this.getNextGames}
          />
        </div>
      </div>

    )
  }

}

const styles = {
  container: {
    display: 'flex',
    flexBasis: '100%',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  header: {
    display: 'flex',
    fontSize: '40px',
    backgroundColor: 'black',
    color: 'white'
  },
  main: {
    display: 'flex'
  }
}
