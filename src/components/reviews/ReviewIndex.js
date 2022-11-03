import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { reviewIndex } from "../../api/review"
import fiveStars from "../../fiveStars"

const ReviewIndex = (props) => {

    const {companyId, msgAlert} = props

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        reviewIndex(companyId)
            .then(res => {
                setReviews(res.data.reviews)
            })
            .catch((err) => {
                msgAlert({
                    heading: "Failure",
                    message: "Failed to find reviews" + err,
                    variant: "danger"
                })
            })
    }, [])


    

    const reviewCards = reviews.map(review => (

        <Card className="review-index-card" key={review._id} style={{backgroundColor: "rgb(152,212,255)", margin: "20px"}}>
                <h1 className="review-index-heading">
                    <div>{fiveStars(review.generalRating)}</div>
                    <div>{review.title}</div>
                </h1>
            <Card.Body>
                <section className="review-index-section">
                    <div className="review-label">Starting Position:</div>
                    <div>{review.startingPosition}</div>
                </section>

                <section className="review-index-section">
                    <div className="review-label">Starting Salary:</div>
                    <div>{review.startingSalary}</div>
                </section>
                
            </Card.Body>
            <Card.Footer>
                <Link className="btn btn-success" to={`/reviews/${review._id}`} >Read More</Link>
            </Card.Footer>
        </Card>
    ))
    return (
        <div className="mt-5" style={{flex: 1, textAlign: "center", }}>
            
            <div  className="company-profile" style={{overflow: "scroll", width: "33vw", margin: "auto", padding: "10px"}}>
                <div className="title-box">
                    <h3 className="profile-title">Reviews</h3> 
                </div>                
                {reviews.length > 0 ? reviewCards : "No Reviews Yet"}
            </div>            
        </div>
    )
}

export default ReviewIndex