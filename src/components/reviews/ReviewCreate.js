import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import { reviewCreate } from '../../api/review'
import Ratings from "react-ratings-declarative"

const ReviewCreate = (props) => {

    const {closeReviewForm, company, companyId, msgAlert, user} = props

    const defaultReview = {
        title: "",
        generalRating: 0,
        startingPosition: "Intern",
        startingSalary: 0,
        content: ""
    }

    const [review, setReview] = useState(defaultReview)


    const handleChange = (e) => {
        setReview(prevReview => {
            return({...prevReview, [e.target.name]: e.target.value})
        })
    }

    const changeRating = (newRating) => {
        setReview(prevReview => {
            return({...prevReview, generalRating: newRating})
        })
    }

    const createReview = (e) => {
        e.preventDefault()

        reviewCreate(review, user, companyId)
            .then(() => {
                closeReviewForm()
            })
            .catch((err) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failed to create review.' + err,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <div className="mt-5" style={{flex: 1, textAlign: "center", }}>
                <div  className="company-profile" style={{width: "33vw", margin: "auto", border: "2px solid black", padding: "20px"}}>
                    <h3 className="create-review-title">Review {company.name}</h3>
                    <Form className="review-form" onSubmit={createReview}>
                        <Form.Group className="mt-3 mb-2">
                            <Form.Label className="review-update-label">Title your Review:</Form.Label>
                            <Form.Control type="text" name="title" value={review.title} onChange={handleChange}/>
                        </Form.Group>                    
                        <Form.Group className="mb-2" style={{display: "flex", justifyContent: "space-between"}}>
                            <br/>
                            <div className="review-stars">
                                <Ratings 
                                    
                                    rating={review.generalRating}
                                    widgetRatedColors="gold"
                                    widgetHoverColors="gold"
                                    widgetEmptyColors="grey"
                                    widgetDimensions="40px"
                                    changeRating={changeRating}
                                >
                                    <Ratings.Widget/>
                                    <Ratings.Widget/>
                                    <Ratings.Widget/>
                                    <Ratings.Widget/>
                                    <Ratings.Widget/>
                                </Ratings>
                            </div>
                            
        
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="review-update-label">Starting Position:</Form.Label>
                            <Form.Select 
                                className= "mb-3"
                                aria-label="starting position" 
                                name="startingPosition" 
                                defaultValue={review.startingPosition} 
                                onChange={handleChange}>
                                <option value="Intern">Intern</option>
                                <option value="Junior">Junior</option>
                                <option value="Senior">Senior</option>
                                <option value="Management">Management</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Starting Salary:</Form.Label>
                            <Form.Control type="number" placeholder={`Starting yearly salary in USD`} name="startingSalary" value={review.startingSalary} onChange={handleChange}/>

                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="review-update-label">Review:</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="What are your reasons for this rating?" name="content" value={review.content} onChange={handleChange}/>
                        </Form.Group>    
                        <div className="text-center mt-3 index-btn-container align-text-bottom mt-2">
                            <button className="company-button" type="submit">Submit Review</button>
                        </div>

                        
                    </Form>

                </div>
            </div>        
        </>

    )
}

export default ReviewCreate