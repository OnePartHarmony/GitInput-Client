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
    const [displayCommentUpdate, setDisplayCommentUpdate] = useState(false)
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

    const triggerRefresh = () => {
        setUpdated(prev => !prev)
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
    let salaryUSD
    if (review !== null) {
        salaryUSD = review.startingSalary.toLocaleString('en-US', {
            style: 'currency',     
            currency: 'USD',     
            currencyDisplay: 'symbol',
            maximumFractionDigits: 2
        })
        if (review.comments.length > 0) {
            comments = review.comments.map((comment, index) => (
                
                <div key={index} className='mt-4' style={{width: "300px", background: "lightgrey", border: "2px solid black", borderRadius: "10px", padding: "8px", margin: "auto"}}>
                    <div>
                        <p>{comment.comment}</p>
                    </div>
                    
                    <div style={{textAlign: "right"}}>
                        <small>{comment.owner.username} </small>
                        <br/>
                        <small>
                            posted {comment.createdAt.split("T")[0]}
                             {/* {comment.createdAt.split("T")[1].split(".")[0]} */}
                        </small>
                        <br/>
                        {comment.createdAt !== comment.updatedAt && <small style={{color: "red"}}>
                            edited {comment.updatedAt.split("T")[0]}
                             {/* {comment.updatedAt.split("T")[1].split(".")[0]} */}
                            </small>}
                    </div>                   
                    {user && user._id === comment.owner._id ? 
                        <div style={{display: "flex", justifyContent: "space-evenly", width: "40%", marginRight: "auto", alignItems: "center"}}>
                            <h4 style={{textShadow: "2px 2px 4px rgba(0,0,0,.6)", cursor: "pointer"}} onClick={() => setDisplayCommentUpdate(prev=>!prev)}>edit</h4>
                            <h2 style={{color: "red", cursor: "pointer", textShadow: "2px 2px 4px rgb(0,0,0,.6)"}} onClick={() => deleteComment(comment._id)}>X</h2>
                        </div>
                    : null }
                    <CommentUpdateModal
                        currentComment={comment.comment}
                        msgAlert={msgAlert}
                        showUpdate={displayCommentUpdate}
                        closeUpdate={() => setDisplayCommentUpdate(false)}
                        user={user}
                        commentId={comment._id}
                        triggerRefresh={triggerRefresh}
                        reviewId={reviewId}
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
                    <div className="review-info d-flex">
                        <section className="review-section-1">
                            {/* conditionally rendered username because seed reviews have no owner */}
                            <section className="review-index-section">
                                <div className="rating-item label">User:</div> 
                                {review.owner ? <div className="rating-item">{ review.owner?.username }</div> : null }
                            </section>

                            <div className="rating-item">{ fiveStars(review.generalRating) }</div>
                            <section className="review-index-section">
                                <div className="rating-item label">Salary:</div> 
                                <div>{ salaryUSD }</div>
                            </section>
                            <section className="review-index-section">
                                <div className="rating-item label">Starting Position:</div> 
                                <div>{ review.startingPosition }</div>
                            </section>
                            <div className="rating-item"> </div>
                        </section>
                        <section className="review-section-2">
                            <div className="review-text">{ review.content }</div>
                        </section>
                    </div>

                    {/* display dates posted and edited, but only both if actually edited */}
                    <small>posted {review.createdAt.split("T")[0]}</small>
                    <br/>
                    {review.createdAt !== review.updatedAt &&
                    <small style={{color: "red"}}>edited {review.updatedAt.split("T")[0]}</small>}
                    
                    <div className="review-btns">
                        <section className="revew-btns-1">
                        {user && (user._id === review.owner?._id) ?
                                <div >
                                    <button className='company-button' onClick={() => setDisplayUpdate(true)}>Edit Review</button>
                                    {isDeleteClicked ? <button className="company-button" onClick={deleteReview}>I'm sure, DELETE</button> : <button className='company-button' onClick={() => setIsDeleteClicked(true)}>Delete Review</button>}
                                </div>
                            : null}
                        </section>
                                {/* only signed-in users can comment */}
                        <section className="revew-btns-2">
                            {user ?
                                <section>
                                    <button className="comment-like-btn" onClick={() => toggleCommentForm()}>Comment</button>
                                    <button className="comment-like-btn" >Like</button>
                                </section>                    
                            : null}
                        </section>
                    </div>

                </div>
            </div>

            {displayCommentForm ?
                <CommentCreate
                    user={user}
                    review = {review}
                    msgAlert = {msgAlert}
                    triggerRefresh={triggerRefresh}
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
                triggerRefresh={triggerRefresh}
                user={user}
                reviewId={reviewId}
            />
        </>
    )
}

export default ReviewShow
