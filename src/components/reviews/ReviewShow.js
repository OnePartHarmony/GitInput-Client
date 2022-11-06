import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate, Link } from 'react-router-dom'
import { reviewDelete, reviewLike, reviewShow, reviewUnlike } from '../../api/review'
import CommentCreate from '../comments/CommentCreate'
import ReviewUpdateModal from './ReviewUpdateModal'
import fiveStars from '../../fiveStars'
import { commentDelete } from '../../api/comments'
import CommentUpdateModal from '../comments/CommentUpdateModal'

const ReviewShow = (props) => {

    const { user, msgAlert} = props
    const { reviewId } = useParams()

    const [review, setReview] = useState(null)
    const [displayCommentForm, setDisplayCommentForm] = useState(false)
    const [displayUpdate, setDisplayUpdate] = useState(false)
    const [displayCommentUpdate, setDisplayCommentUpdate] = useState(false)
    const [isDeleteClicked, setIsDeleteClicked] = useState(false)
    const [updated, setUpdated] = useState(false)


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

    if (!review){
        return(
            <>Loading...</>
        )        
    }    
    
    const toggleCommentForm = () => {
            setDisplayCommentForm(prevState => !prevState)
    }

    const triggerRefresh = () => {
        setUpdated(prev => !prev)
    }

    const likeReview = () => {
        reviewLike(user, reviewId)
            .then(setTimeout(triggerRefresh, 300))
            .catch((err) => {
                msgAlert({
                    heading: "Failed to Like Review",
                    message: "error: " + err,
                    variant: "danger"
                })
            })
    }

    const unLikeReview = () => {
        reviewUnlike(user, reviewId)
            .then(setTimeout(triggerRefresh, 300))
            .catch((err) => {
                msgAlert({
                    heading: "Failed to Unlike Review",
                    message: "error: " + err,
                    variant: "danger"
                })
            })
    }

    const deleteComment = (commentId) => {
        commentDelete(user, reviewId, commentId)
            .then(triggerRefresh)
            .catch((err) => {
                msgAlert({
                    heading: "Failed to Delete Comment",
                    message: "error: " + err,
                    variant: "danger"
                })
            })
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


    let comments
    let salaryUSD
    if (review !== null) {
    ////show starting salary as money vs number
        salaryUSD = review.startingSalary.toLocaleString('en-US', {
            style: 'currency',     
            currency: 'USD',     
            currencyDisplay: 'symbol',
            maximumFractionDigits: 0
        })
    ///map comments to cards
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
                        {/* date comment was written */}
                            posted {comment.createdAt.split("T")[0]}
                        </small>
                        <br/>
                    {/* if comment has been updated, show updated date */}
                        {comment.createdAt !== comment.updatedAt && <small style={{color: "red"}}>
                            edited {comment.updatedAt.split("T")[0]}
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


    return (
        <>
             <style>{'body { height:100vh; width:100vw; background-color: rgba(159, 159, 159, .3); background-image: linear-gradient(60deg, rgba(237, 237, 237, 1) 35%, transparent 30%), linear-gradient(-400deg, rgba(202, 235, 242, .7) 40%, transparent 30%);}'}</style>
            <div className="show-review-container">
                <Link to={`/companies/${review.company._id}`} style={{color: "black", textDecoration: "none"}} className="text-center">
                    <h1 className="mt-5 mb-4" >{review.company.name}</h1>
                    <img className="logo-review-show mt-3 mb-5" alt="logo" src={review.company.logo}></img>
                </Link>                
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
                    {review.createdAt !== review.updatedAt && 
                    <>
                        <br/>
                        <small style={{color: "red"}}>edited {review.updatedAt.split("T")[0]}</small>
                    </>}
                    <br/>
                    {/* display likes */}
                    {review.userLikes.length > 0 && (
                        review.userLikes.length === 1 ?                            
                            <small>1 like</small>
                        :
                            <small>{review.userLikes.length} likes</small>
                    )}
                    
                    <div className="review-btns">
                        <section className="revew-btns-1">
                        {user && (user._id === review.owner?._id) ?
                                <div >
                                    <button className='company-button' onClick={() => setDisplayUpdate(true)}>Edit Review</button>
                                    {isDeleteClicked ? <button className="company-button" onClick={deleteReview}>I'm sure, DELETE</button> : <button className='company-button' onClick={() => setIsDeleteClicked(true)}>Delete Review</button>}
                                </div>
                            : null}
                        </section>
                                {/* only signed-in users can comment or like */}
                        <section className="revew-btns-2">
                            {user ?
                                <section>
                                {/* hollow thumb icon for like becomes solid icon for unlike */}
                                    {review.userLikes.includes(user._id) ?
                                        <p style={{color: "rgb(38,173,204)", cursor: "pointer", margin: "0px 10px 10px 20px"}} onClick={unLikeReview}><img style={{height: "25px"}} alt="unlike" src={require('../../icons/thumbs-up.png')}/> unlike</p>
                                        :
                                        <p style={{cursor: "pointer", margin: "0px 10px 10px 20px"}} onClick={likeReview}><img style={{height: "25px"}} alt="like" src={require('../../icons/blackHollowThumb.png')}/> like</p>
                                    }

                                    <button className="comment-like-btn" onClick={() => toggleCommentForm()}>Comment</button>
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
