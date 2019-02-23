// DEPENDENCIES
// ************

import React, { Component } from 'react'

// STYLES
// ******

import './ButtonStyles'

// COMPONENT DEFINITION
// ********************

class Button extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: this.props.text
    }
  }
  handleClick () {
    // Lazy loading: Promises
    // If wanting to pack in one bundle, use the same name. Otherwise, use different names
    Promise.all([
      import(/* webpackChunkName: "Button-Clicked" */ './Button-Clicked'),
      import(/* webpackChunkName: "Button-Clicked" */'./Button-Clicked-Log')
    ]).then(([{ buttonText }, { logText }]) => {
      this.setState(() => ({ text: buttonText }))
      console.log(logText)
    }).catch(err => window.alert(err))
  }
  render () {
    const { text } = this.state
    return (
      <div className='round-button pure-button' onClick={e => this.handleClick()}>
        {text}
      </div>
    )
  }
}

// EXPORT
// ******

export default Button
