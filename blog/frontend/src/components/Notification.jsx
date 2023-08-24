const Notification = ({ message, error }) => {
  if (!message) {
    return null
  }

  if (error) {
    return (
      <div className='errorMessage'>{message}</div>
    )
  } else {
    return (
      <div className='notificationMessage'>{message}</div>
    )
  }
}

export default Notification