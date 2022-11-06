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
    }, [companyId, msgAlert])



    const reviewCards = reviews.map(review => {
        const salaryUSD = review.startingSalary.toLocaleString('en-US', {
            style: 'currency',     
            currency: 'USD',     
            currencyDisplay: 'symbol',
            maximumFractionDigits: 0
        })
        return (
            <Card className="review-index-card mt-0" key={review._id} style={{backgroundColor: "#EFEFEF", margin: "20px"}}>
                <Card.Header className="review-index-section mb-1">
                    {/* <div className="label review-user">User:</div> */}
                    <div className="label review-user">{review.owner?.username}</div>
                    
                    <p style={{marginLeft: "auto"}}>{review.userLikes.length}<img style={{height: "25px"}} alt="likes" src={require("../../icons/thumbs-up.png")}></img></p>
                    
                </Card.Header>
                <section className="review-index-heading">
                    <div className="stars">{fiveStars(review.generalRating)}</div>
                    <div className="review-index-title">{review.title}</div>
                </section>
                <Card.Body>
                    <section className="review-index-section">
                        <div className="label">Starting Position:</div>
                        <div>{review.startingPosition}</div>
                    </section>

                    <section className="review-index-section">
                        <div className="label">Starting Salary:</div>
                        <div>{salaryUSD}</div>
                    </section>
                    
                </Card.Body>
                <Card.Footer>
                    <Link className="company-button" to={`/reviews/${review._id}`} >Read More</Link>
                </Card.Footer>
            </Card>
        )
    })
    return (
        <div className="mt-5" style={{flex: 1, textAlign: "center", }}>
            
            <div  className="company-profile" style={{width: "33vw", margin: "auto", padding: "10px", position: "relative"}}>
                <div className="title-box mb-3">
                    <h3 className="profile-title fixed">Reviews</h3> 
                </div>      
                <div className="scroll">        
                    {reviews.length > 0 ? reviewCards : "No Reviews Yet"}
                </div>
            </div>            
        </div>
    )
}

export default ReviewIndex