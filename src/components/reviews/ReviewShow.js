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
    const [displayButtons, setDisplayButtons] = useState(false)



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

    const handleDropDown = () => {
        setDisplayButtons(!displayButtons)
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
                
                <div key={index} className='mt-4 comment-box'>
                    <small><span style={{fontWeight: 'bold'}}>User:</span> {comment.owner.username} </small>
                    <div className="mt-2">
                        <p>{comment.comment}</p>
                    </div>
                    
                    <div>
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
                        <div>
                            <button className="comment-edit-btn company-button" onClick={() => setDisplayCommentUpdate(prev=>!prev)}>edit</button>
                            <br/>
                            <button className="comment-delete-btn" onClick={() => deleteComment(comment._id)}>X</button>
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

        <main className="review-show-page">
            <div className="show-review-container">

                <div className="mt-3 mb-2 review-company review-company-container">
                <Link to={`/companies/${review.company._id}`} style={{color: "black", textDecoration: "none"}}>
                    <div>Company: {review.company.name}</div>
                </Link>     
                    <div className="num-likes">
                        {review.userLikes.length > 0 && (
                                review.userLikes.length === 1 ?                            
                                    <small>1 like</small>
                                :
                                    <small>{review.userLikes.length} likes</small>
                            )}
                    </div>
                </div>
                
                <div className="review-card">
                    <div className="review-info">
                        <section className="review-section-1">
                            {/* conditionally rendered username because seed reviews have no owner */}
                            <div className="review-title mb-2">{ fiveStars(review.generalRating) } { review.title }</div>
                            <section className="review-index-section">
                                <div className="rating-item label">User:</div> 
                                {review.owner ? <div className="rating-item">{ review.owner?.username }</div> : null }
                            </section>
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
                    </div>
                    <section className="review-section-2">
                        <div>{ review.content }</div>
                    </section>

                    {/* display likes */}

                    
                    <div>
                    {user && (user._id === review.owner?._id) ?
                        <button className="drop-down-btn" onClick={handleDropDown}>...</button>
                    : null}
                        {displayButtons ? (
                            <section>
                            {user && (user._id === review.owner?._id) ?
                                    <div className="comment-btn-container">
                                        <button className='company-button' onClick={() => setDisplayUpdate(true)}>Edit Review</button>
                                        {isDeleteClicked ? <button className="company-button" onClick={deleteReview}>I'm sure, DELETE</button> : <button className='company-button' onClick={() => setIsDeleteClicked(true)}>Delete Review</button>}
                                    </div>
                                : null}
                            </section>
                        ) : null}

                                {/* only signed-in users can comment or like */}
                        <section >
                            {user ?
                                <section className="review-btns">
                                {/* hollow thumb icon for like becomes solid icon for unlike */}
                                    <div className="like-btn">
                                    {review.userLikes.includes(user._id) ?
                                        <div style={{color: "#404040", cursor: "pointer"}} onClick={unLikeReview}><img style={{height: "20px"}} alt="unlike" src={require('../../icons/thumbs-up.png')}/> unlike</div>
                                        :
                                        <div style={{cursor: "pointer"}} onClick={likeReview}><img style={{height: "20px"}} alt="like" src={require('../../icons/blackHollowThumb.png')}/> like</div>
                                    }
                                    </div>
                                    <button className="comment-btn" onClick={() => toggleCommentForm()}>Comment</button>
                                </section>                    
                            : null}
                        </section>
                    </div>
                    <section className="review-dates">
                        <div>
                            {/* display dates posted and edited, but only both if actually edited */}
                            <small>posted {review.createdAt.split("T")[0]}</small>                    
                            {review.createdAt !== review.updatedAt && 
                            <>
                            <br/>
                            <small style={{color: "red"}}>edited {review.updatedAt.split("T")[0]}</small>
                            </>}
                            <br/>
                        </div>
                    </section>
                </div>
                {displayCommentForm ?
                    <div className="comment-create">
                        
                        <CommentCreate
                            user={user}
                            review = {review}
                            msgAlert = {msgAlert}
                            triggerRefresh={triggerRefresh}
                            closeComment={() => setDisplayCommentForm(false)}
                        />
                    </div>
                : null}
            </div>
            <div className="review-show-comments mt-5">
                <div className="comment-container">
                    <div className="text-center mt-3">See what others have to say about this review:</div>
                    <div>{ comments ? comments : null}</div>
                </div>
            </div>
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
        </main>
        </>
    )
}

export default ReviewShow
