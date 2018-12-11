import PropTypes from 'prop-types'
import React from 'react'

import SetupGame from './SetupGame/index.jsx'

const PAGES = {
  setupGame: "setupGame"
}

export default class Games extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      page: PAGES.setupGame
    }
  }

  getPage() {
    debugger
    switch (this.state.page) {
      case PAGES.setupGame:
        return <SetupGame />
        break;
      default:
        return <SetupGame />
    }
  }


  render() {

    return (
      this.getPage()
    )
  }

}

const styles = {
  container: {
    height: '100vh',
    width: '100vw'
  }
}
