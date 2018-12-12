import _ from 'lodash'
import onClickOutside from 'react-onclickoutside'
import PropTypes from 'prop-types'
import React from 'react'

class Dropdown extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      showDropdown: this.props.showDropdown,
    }
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
  }

  handleClickOutside() {
    this.setState({ showDropdown: false })
  }

  onButtonClick() {
    this.setState({showDropdown: !this.state.showDropdown})
  }

  onSelect(item) {
    this.setState({ showDropdown: false })
    this.props.onSelect(item)
  }

  render() {
    const { dropdownArray, onSelect, selectedOption } = this.props
    const dropdownOptions = _.map(dropdownArray, item => (
      <a className="dropdown-item" onClick={() => this.onSelect(item)}>{item.name}</a>
    ))
    return (
        <div class="dropdown">
          <button style={styles.button} className="btn btn-secondary dropdown-toggle" type="button" onClick={this.onButtonClick}>
            {selectedOption.name}
            <span class="caret"></span>
          </button>
          <ul style={styles.dropdownOptions(this.state.showDropdown)} className="dropdown-menu">
            {dropdownOptions}
          </ul>
        </div>
    )
  }

}

const styles = {
  button: {
  },
  dropdownOptions: showDropdown => ({
    display: showDropdown ? 'block' : 'none'
  })
}

export default onClickOutside(Dropdown)
