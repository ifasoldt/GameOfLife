import PropTypes from 'prop-types'
import React from 'react'

import Api from 'helpers/Api'
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
      page: PAGES.setup,
      game: {}
    }
    this.createGame = this.createGame.bind(this)
  }

  getPage() {
    switch (this.state.page) {
      case PAGES.setup:
        return <Setup createGame={this.createGame} />
        break;
      case PAGES.simulation:
        return <Simulation game={this.state.game} />
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

  buildGameObject(boardValues) {
    return {
      initial_board: boardValues,
      current_board: boardValues
    }
  }


  render() {

    return (
      this.getPage()
    )
  }

}
