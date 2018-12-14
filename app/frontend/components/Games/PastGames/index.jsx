import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Dropdown from 'components/Dropdown/index.jsx'
import GameBoard from 'components/Games/GameBoard/index.jsx'

export default class Setup extends React.PureComponent {

  render() {
      <GameBoard
        boardValuesArray={this.state.boardValuesArray}
        toggleCell={this.toggleCell}
        interactive={false}
      />
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
