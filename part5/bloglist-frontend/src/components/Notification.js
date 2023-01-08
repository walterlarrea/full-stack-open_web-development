const Notification = ({ status, message }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const successStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div className='error' style={status === 'OK' ? successStyle : errorStyle}>
      {message}
    </div>
  )
  // Status will have either "OK" or "ERROR" String values
}

export default Notification