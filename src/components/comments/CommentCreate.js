import React, { useState } from 'react'
import CommentForm from '../shared/CommentForm'
import { commentCreate } from '../../api/comments'

const CommentCreate = (props) => {
    const {user, review, msgAlert, triggerRefresh, closeComment} = props
    const [comment, setComment] = useState('')

    const handleChange = (e) => {
        setComment(e.target.value)
    }

    const createComment = () => {
        commentCreate(user, review._id, comment)
            .then(() => {
                closeComment()
                triggerRefresh()                
            })
            .catch((err) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failed to create comment.' + err,
                    variant: 'danger'
                })
            })
    }

    return(
        <>
        <CommentForm
            comment = { comment }
            handleChange = { handleChange }
            handleSubmit = { createComment }
        />
        </>
    )
}

export default CommentCreate
