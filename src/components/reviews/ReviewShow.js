import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import { reviewShow } from '../../api/review'
import CommentCreate from '../comments/CommentCreate'


const ReviewShow = (props) => {

    const { user, msgAlert} = props
    const [review, setReview] = useState(null)
    const [displayCommentForm, setDisplayCommentForm] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { reviewId } = useParams()
//    console.log(user)
    
    useEffect(() => {
        reviewShow(reviewId)
            .then((res) => {
                setReview(res.data.review)
 //               console.log(res.data.review)
            })
            .catch((err) => {
                msgAlert({
                    heading: "Failure",
                    message: "Failed to find review." + err,
                    variant: "danger"
                })
            })
    }, [updated])
    
    const toggleCommentForm = () => {
            setDisplayCommentForm(prevState => !prevState)
    }



    if (!review){
        return(
            <>Loading...</>
        )
        
    }
    let comments
    if (review !== null) {
//        console.log(review.comments)
        if (review.comments.length > 0) {
            comments = review.comments.map(comment => (
                <>
                    {/* <h3>Username: {comment.owner.username} </h3> */}
                    <p>{comment.comment}</p>
                </>
            ))
        }
    }


    return (
        <>
             <style>{'body { height:100vh; width:100vw; background-color: rgba(159, 159, 159, .3); background-image: linear-gradient(60deg, rgba(237, 237, 237, 1) 35%, transparent 30%), linear-gradient(-400deg, rgba(202, 235, 242, .7) 40%, transparent 30%);}'}</style>
            <div className="show-review-container">
                <h1 className="text-center mt-5 mb-4">{review.company.name}</h1>
                <img className="logo-review-show mt-3 mb-5" src={review.company.logo}></img>
                <h2 className="text-center review-title">{ review.title }</h2>
                <div className="review-card">
                    <div className="review-info">
                        <section className="review-section-1">
                            {/* conditionally rendered username because seed reviews have no owner */}
                            {review.owner ? <div className="rating-item">User: { review.owner?.username }</div> : null }
                            <div className="rating-item">Rating: { review.generalRating }</div>
                            <div className="rating-item">Salary: { review.startingSalary }</div>
                            <div className="rating-item">Starting Position: { review.startingPosition }</div>
                        </section>
                        <section className="review-section-2">
                            <div className="review-text">{ review.content }</div>
                        </section>
                    </div>
                    {/* only signed-in users can comment */}
                    {user ?
                        <section className="review-btns">
                            <button className="review-btn" onClick={() => toggleCommentForm()}>Comment</button>
                            <button className="review-btn" >Like</button>
                        </section>                    
                    : null}

                </div>
            </div>

            {displayCommentForm ? <CommentCreate user={user} review = {review} msgAlert = {msgAlert} triggerRefresh={() => setUpdated(prev => !prev)} closeComment={() => setDisplayCommentForm(false)}/> : null}

            <div>{ comments ? comments : null}</div>

        </>
    )
}

export default ReviewShow
