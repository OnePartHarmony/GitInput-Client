import { useState } from "react"
import { Modal } from "react-bootstrap"
import {commentUpdate} from "../../api/comments"
import CommentForm from "../shared/CommentForm"


const CommentUpdateModal = (props) => {
    const {currentComment, msgAlert, showUpdate, closeUpdate, user, commentId, triggerRefresh, reviewId} = props


  const [comment, setComment] = useState(currentComment)

  const handleChange = (e) => {
      setComment(e.target.value)
  }

  // can remove unused `e` from params
  const editComment = (e) => {
    commentUpdate(user, comment, commentId, reviewId)
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
      <Modal className="mt-5"show={showUpdate} onHide={closeUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CommentForm
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