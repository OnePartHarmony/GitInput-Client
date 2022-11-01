import React from 'react'
import { Form, Button, Card } from 'react-bootstrap'

const ReviewShow = (props) => {


    return (
        <>
            <container className="show-review-container">
                <h1 className="text-center mt-5 mb-4">Company Name</h1>
                <img className="logo-review-show mt-3 mb-5" src="https://logo.clearbit.com/google.com"></img>
                <h2 className="text-center review-title">Reviews</h2>
            <container className="review-card">
                <section className="review-section-1">
                    <div className="rating-item">User: meg</div>
                    <div className="rating-item">Rating: *****</div>
                    <div className="rating-item">Salary: $3,000,000</div>
                    <div className="rating-item">Starting Position: CEO</div>
                </section>
                <section className="review-section-2">
                    <div className="review-text"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
                </section>
            </container>
            </container>
        </>
    )
}

export default ReviewShow