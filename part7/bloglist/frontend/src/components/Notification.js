import { connect } from 'react-redux'

import { Alert } from '@mui/material'

const Notification = (props) => {
  // const errorStyle = {
  //   color: 'red',
  //   background: 'lightgray',
  //   fontSize: 20,
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10
  // }
  // const successStyle = {
  //   color: 'green',
  //   background: 'lightgray',
  //   fontSize: 20,
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10
  // }

  return (
    props.notification.message !== ''
      ? <Alert severity={props.notification.type === 'GOOD' ? 'success' : 'error'}>
        {props.notification.message}
      </Alert>
      :
      ''
  )
  // ? <div className='error' style={props.notification.type === 'GOOD' ? successStyle : errorStyle}>
  //   {props.notification.message}
  // </div>
  // : ''
  // Status will have either "GOOD" or "BAD" String values
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)