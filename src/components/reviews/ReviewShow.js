import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { reviewDelete, reviewShow } from '../../api/review'
import CommentCreate from '../comments/CommentCreate'
import ReviewUpdateModal from './ReviewUpdateModal'
import fiveStars from '../../fiveStars'
import { commentDelete } from '../../api/comments'
import CommentUpdateModal from '../comments/CommentUpdateModal'

const ReviewShow = (props) => {

    const { user, msgAlert} = props
    const [review, setReview] = useState(null)
    const [displayCommentForm, setDisplayCommentForm] = useState(false)
    const [displayUpdate, setDisplayUpdate] = useState(false)
    const [isDeleteClicked, setIsDeleteClicked] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { reviewId } = useParams()

    const navigate = useNavigate()
    
    useEffect(() => {
        reviewShow(reviewId)
            .then((res) => {
                setReview(res.data.review)
            })
            .catch((err) => {
                msgAlert({
                    heading: "Failure",
                    message: "Failed to find review." + err,
                    variant: "danger"
                })
            })
    }, [updated, msgAlert, reviewId])
    
    const toggleCommentForm = () => {
            setDisplayCommentForm(prevState => !prevState)
    }

    const deleteComment = (commentId) => {
        commentDelete(user, reviewId, commentId)
            .then(() => setUpdated(prev => !prev))
            .catch((err) => {
                msgAlert({
                    heading: "Failed to Delete Comment",
                    message: "error: " + err,
                    variant: "danger"
                })
            })
    }

    if (!review){
        return(
            <>Loading...</>
        )        
    }

    let comments
    if (review !== null) {
        if (review.comments.length > 0) {

            comments = review.comments.map((comment, index) => (
                
                <div key={index} className='mt-4' style={{width: "300px", background: "lightgrey", border: "2px solid black", borderRadius: "10px", padding: "8px", margin: "auto"}}>
                    <div>
                        <p>{comment.comment}</p>
                    </div>
                    
                    <div style={{textAlign: "right"}}>
                        <small>{comment.owner.username} </small>
                        <br/>
                        <small>{comment.createdAt.split("T")[0]}</small>
                        <br/>
                        {comment.createdAt !== comment.updatedAt && <small style={{color: "red"}}>{comment.updatedAt.split()[0]}</small>}
                    </div>                   
                    {user && user._id === comment.owner._id ? 
                        <div style={{display: "flex", justifyContent: "space-evenly", width: "40%", marginRight: "auto", alignItems: "center"}}>
                            <h4 style={{textShadow: "2px 2px 4px rgba(0,0,0,.6)", cursor: "pointer"}}>edit</h4>
                            <h2 style={{color: "red", cursor: "pointer", textShadow: "2px 2px 4px rgb(0,0,0,.6)"}} onClick={() => deleteComment(comment._id)}>X</h2>
                        </div>
                    : null }
                    <CommentUpdateModal
                        currentComment={comment}
                        msgAlert={msgAlert}
                        showUpdate=
                        closeUpdate=
                        user={user}
                        commentId={comment._id}
                        triggerRefresh=
                    />
                </div>

            ))
        }
    }


    const deleteReview = () => {
        reviewDelete(user, reviewId)
            .then(() => {
                navigate(`/companies/${review.company._id}`)
            })
            .catch((err) => {
                msgAlert({
                    heading: "Failure",
                    message: "Failed to delete review: " + err,
                    variant: "danger"
                })
            })
    }

    return (
        <>
             <style>{'body { height:100vh; width:100vw; background-color: rgba(159, 159, 159, .3); background-image: linear-gradient(60deg, rgba(237, 237, 237, 1) 35%, transparent 30%), linear-gradient(-400deg, rgba(202, 235, 242, .7) 40%, transparent 30%);}'}</style>
            <div className="show-review-container">
                <h1 className="text-center mt-5 mb-4">{review.company.name}</h1>
                <img className="logo-review-show mt-3 mb-5" alt="logo" src={review.company.logo}></img>
                <h2 className="text-center review-title">{ review.title }</h2>
                <div className="review-card">
                    <div className="review-info">
                        <section className="review-section-1">
                            {/* conditionally rendered username because seed reviews have no owner */}
                            {review.owner ? <div className="rating-item">User: { review.owner?.username }</div> : null }
                            <div className="rating-item">{ fiveStars(review.generalRating) }</div>
                            <div className="rating-item">Salary: { review.startingSalary }</div>
                            <div className="rating-item">Starting Position: { review.startingPosition }</div>
                        </section>
                        <section className="review-section-2">
                            <div className="review-text">{ review.content }</div>
                        </section>
                    </div>
                    {user && (user._id === review.owner?._id) ?
                        <div>
                            <Button className='btn-info' onClick={() => setDisplayUpdate(true)}>Edit Review</Button>
                            {isDeleteClicked ? <Button className="btn-danger" onClick={deleteReview}>I'm sure, DELETE</Button> : <Button className='btn-warning' onClick={() => setIsDeleteClicked(true)}>Delete this Review?</Button>}
                        </div>
                    : null}
                             {/* only signed-in users can comment */}
                    {user ?
                        <section className="review-btns">
                            <button className="review-btn" onClick={() => toggleCommentForm()}>Comment</button>
                            <button className="review-btn" >Like</button>
                        </section>                    
                    : null}

                </div>
            </div>

            {displayCommentForm ?
                <CommentCreate
                    user={user}
                    review = {review}
                    msgAlert = {msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    closeComment={() => setDisplayCommentForm(false)}
                />
            : null}

            <div>{ comments ? comments : null}</div>
            <ReviewUpdateModal
                currentReview={review}
                company={review.company}
                msgAlert={msgAlert}
                showUpdate={displayUpdate}
                closeUpdate={() => setDisplayUpdate(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
                user={user}
                reviewId={reviewId}
            />
        </>
    )
}

export default ReviewShow
