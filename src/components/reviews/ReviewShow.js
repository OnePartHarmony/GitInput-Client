import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import SetComment from '../comments/SetComment'


const ReviewShow = (props) => {

    const [review, setReview] = useState( null)
    const { id } = useParams()




    return (
        <>
             <style>{'body { height:100vh; width:100vw; background-color: rgba(159, 159, 159, .3); background-image: linear-gradient(60deg, rgba(237, 237, 237, 1) 35%, transparent 30%), linear-gradient(-400deg, rgba(202, 235, 242, .7) 40%, transparent 30%);}'}</style>
            <div className="show-review-container">
                <h1 className="text-center mt-5 mb-4">Company Name</h1>
                <img className="logo-review-show mt-3 mb-5" src="https://logo.clearbit.com/google.com"></img>
                <h2 className="text-center review-title">Reviews</h2>
                <div className="review-card">
                    <div className="review-info">
                        <section className="review-section-1">
                            <div className="rating-item">User: meg</div>
                            <div className="rating-item">Rating: *****</div>
                            <div className="rating-item">Salary: $3,000,000</div>
                            <div className="rating-item">Starting Position: CEO</div>
                        </section>
                        <section className="review-section-2">
                            <div className="review-text"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
                        </section>
                    </div>
                    <section className="review-btns">
                        <button className="review-btn">Comment</button>
                        <button className="review-btn">Like</button>
                    </section>
            </div>
            </div>
            {/* <SetComment></SetComment> */}
        </>
    )
}

export default ReviewShow