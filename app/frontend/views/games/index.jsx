import React from 'react'
import ReactDOM from 'react-dom'

import Games from 'components/Games/index.jsx'

App.React.renderGames = () => {
  ReactDOM.render(
    <Games />,
    document.getElementById('react-root')
  )
}
