import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Cell from './Cell/index.jsx'

export default class Row extends React.PureComponent {



  render() {
    const { rowIndex, rowValues } = this.props
    const cells = _.map(rowValues, (value, cellIndex) =>{
      return <Cell value={value} cellIndex={cellIndex} />
    })
    return (
      <div style={styles.row}>
        {cells}
      </div>
    )
  }

}

const styles = {
  row: {
    display: 'flex'
  }
}