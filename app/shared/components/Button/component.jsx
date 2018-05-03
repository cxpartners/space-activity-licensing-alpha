import React from 'react'
import classNames from 'classnames'

export default class Button extends React.Component {
  onClick (event) {
    const { clickHandler } = this.props

    if (!clickHandler) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const handler = clickHandler()
  }

  render () {
    let component
    let { children, url, label, type, modifiers } = this.props
    let classes = classNames('button', this.props.className, modifiers, {
      'loading': this.props.disabled && this.props.loading
    })

    let data = this.props.data ? {[this.props.data]: true} : null

    let disabled = !!this.props.disabled

    if (url || type === 'a') {
      component = (
        <a href={url}
          className={classes}
          role='button'
          {...data}
          onClick={event => this.onClick(event)}>
          {children}{label}</a>
      )
    } else {
      component = (
        <button
          disabled={disabled}
          {...data}
          onClick={event => this.onClick(event)}
          className={classes} type={type}>
          {children}{label}
        </button>
      )
    }

    return component
  }
}
