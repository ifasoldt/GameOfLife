import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Dropdown from 'components/Dropdown/index.jsx'

export default class SetupGame extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      boardSize: '20x20'
    }
    this.onSelect = this.onSelect.bind(this)
  }

  onSelect(boardSize) {
    this.setState({boardSize: boardSize})
  }

  render() {

    const dropdownOptionsArray = _.map(_.range(2, 20), number => (
      `${number}x${number}`
    ))
    return (
      <div style={styles.container}>
        <Dropdown
          dropdownArray={dropdownOptionsArray}
          onSelect={this.onSelect}
          selectedOption={this.state.boardSize}
        />
      </div>
    )
  }

}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'Column',
    flexBasis: '80%',
    backgroundColor: 'black'
  },
  dropdown: {
  }
}
