import React, {useState} from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { reviewUpdate } from "../../api/review"
import Ratings from "react-ratings-declarative"

const ReviewUpdateModal = (props) => {

    const {currentReview, company, msgAlert, showUpdate, closeUpdate} = props
    
    const [review, setReview] = useState(currentReview)

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

    const updateReview = () => {
        reviewUpdate(review)
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: 'Your review has ben updated.',
                    variant: 'success'
                })
            })
            .catch((err) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failed to update review.' + err,
                    variant: 'danger'
                })
            })
    }


    return (
        <>
            
            <Modal show={ showUpdate } onHide={ closeUpdate }>
                <Modal.Header closeButton />
                <Modal.Body>

                    <h3>Update Review of {company.name}</h3>
                    <Form onSubmit={updateReview}>
                        <Form.Group className="mb-2">
                            <Form.Label>Review Title:</Form.Label>
                            <Form.Control type="text" name="title" value={review.title}placeholder={currentReview.title} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" style={{display: "flex", justifyContent: "space-between"}}>
                            <Form.Label>Your Rating:</Form.Label>
                            <br/>
                            {/* Star rating radio inputs */} 
                            <Ratings
                                rating={review.generalRating}
                                widgetRatedColors="gold"
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
                            
        
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Starting Position:</Form.Label>
                            <Form.Select aria-label="starting position" name="startingPosition" defaultValue={review.startingPosition} onChange={handleChange}>
                                <option value="Intern">Intern</option>
                                <option value="Junior">Junior</option>
                                <option value="Senior">Senior</option>
                                <option value="Management">Management</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Starting Salary:</Form.Label>
                            <Form.Control placeholder={currentReview.startingSalary} name="startingSalary" value={review.startingSalary} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Review:</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder={currentReview.content} name="content" value={review.content} onChange={handleChange}/>
                        </Form.Group>
                        <Button type="submit">Update Review</Button>
                    </Form>
                    
                </Modal.Body>
            </Modal>
            
        </>

    )
}

export default ReviewUpdateModal
