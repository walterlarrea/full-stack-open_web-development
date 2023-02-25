import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import {
  Button
} from '@mui/material'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="outlined" onClick={toggleVisibility}>{buttonLabel}</Button>
        {/* <button onClick={toggleVisibility}>{buttonLabel}</button> */}
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button variant="text" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable