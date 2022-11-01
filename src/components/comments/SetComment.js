// import React, { useState } from 'react'
// import CommentForm from '../shared/CommentForm'
// import commentCreate from '../../api/comments'

// const SetComment = () => {
//     const [comment, setComment] = useState({})

//     const handleChange = (e) => {
//         setComment(e.target.value)

//         const handleCreateComment = (e) => {
//             e.preventDefault()

//             commentCreate(comment, user)
//                 .then(() => {
//                     msgAlert({
//                         heading: 'Success',
//                         message: 'Create Comment',
//                         variant: 'success'
//                     })
//                 })
//                 .catch((error) => {
//                     msgAlert({
//                         heading: 'Failure',
//                         message: 'Create Comment Failure' + error,
//                         variant: 'danger'
//                     })
//                 })
//         }   
        
//     }

//     return(
//         <>
//             <CommentForm
//                 comment = { comment }
//                 handleChange = { handleChange }
//                 handleSubmit = { handleCreateComment }
//             />
//         </>
//     )
// }

// export default SetComment