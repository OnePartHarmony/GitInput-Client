const CommentUpdateModal = (props) => {
    const {currentComment, msgAlert, showUpdate, closeUpdate, user, commentId, triggerRefresh} = props


  const [comment, setComment] = useState(currentComment)

  const handleChange = (e) => {
      setComment(e.target.value)
  }

  const editComment = (e) => {
    e.preventDefault()
    commmentUpdate(comment, user, commentId)
    .then(() => {
        triggerRefresh()
        closeUpdate()
    })
        .catch((err) => {
            msgAlert({
                heading: 'Failure',
                message: 'Failed to update comment: ' + err,
                variant: 'danger'
            })
        })
}


  return (
    <>
      <Modal show={showUpdate} onHide={closeUpdate}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CommmentForm
                comment = { comment }
                handleChange = { handleChange }
                handleSubmit = { editComment }
          />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentUpdateModal