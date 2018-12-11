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
      <li onClick={() => this.onSelect(item)}><a>{item}</a></li>
    ))
    return (
        <div class="dropdown">
          <button class="btn btn-default" type="button" onClick={this.onButtonClick}>
            {selectedOption}
            <span class="caret"></span>
          </button>
          <ul style={styles.dropdownOptions(this.state.showDropdown)} class="dropdown-menu">
            {dropdownOptions}
          </ul>
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
  },
  dropdownOptions: showDropdown => ({
    display: showDropdown ? 'block' : 'none'
  })
}

export default onClickOutside(Dropdown)
