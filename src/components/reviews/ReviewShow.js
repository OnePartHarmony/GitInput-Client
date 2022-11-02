import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import { reviewShow } from '../../api/review'
import CommentCreate from '../comments/CommentCreate'

const ReviewShow = (props) => {

    const { user, msgAlert } = props
    const [review, setReview] = useState({})
    const [displayComments, setDisplayComments] = useState(false)
    const { reviewId } = useParams()

    useEffect(() => {
        console.log('this is the reviewId', reviewId)
        reviewShow(reviewId)
            .then((res) => {
                console.log('this is the review res.data', res.data.review.owner.username)
                setReview(res.data.review)
                console.log(res.data.review)
            })
            .catch((err) => {
                msgAlert({
                    heading: "Failure",
                    message: "Failed to find review." + err,
                    variant: "danger"
                })
            })
    }, [])

    const toggleCommentForm = () => {
            setDisplayComments(prevState => !prevState)
    }

    return (
        <>
             <style>{'body { height:100vh; width:100vw; background-color: rgba(159, 159, 159, .3); background-image: linear-gradient(60deg, rgba(237, 237, 237, 1) 35%, transparent 30%), linear-gradient(-400deg, rgba(202, 235, 242, .7) 40%, transparent 30%);}'}</style>
            <div className="show-review-container">
                <h1 className="text-center mt-5 mb-4">Company Name</h1>
                <img className="logo-review-show mt-3 mb-5" src="https://logo.clearbit.com/google.com"></img>
                <h2 className="text-center review-title">{ review.title }</h2>
                <div className="review-card">
                    <div className="review-info">
                        <section className="review-section-1">
                            <div className="rating-item">User: { review.owner.username }</div>
                            <div className="rating-item">Rating: { review.generalRating }</div>
                            <div className="rating-item">Salary: { review.startingSalary }</div>
                            <div className="rating-item">Starting Position: { review.startingPosition }</div>
                        </section>
                        <section className="review-section-2">
                            <div className="review-text">{ review.content }</div>
                        </section>
                    </div>
                    <section className="review-btns">
                        <button className="review-btn" onClick={() => toggleCommentForm()}>Comment</button>
                        <button className="review-btn" >Like</button>
                    </section>
                </div>
            </div>
            {displayComments ? <CommentCreate user={user} review = {review} msgAlert = {msgAlert} /> : null}

        </>
    )
}

export default ReviewShow