import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { reviewCreate } from "../../api/review"

const ReviewIndex = (props) => {

    const {company} = props

    // const reveiwCards = company.reviews.map(review => (
    //     <Card key={review._id} style={{backgroundColor: "rgb(152,212,255)""}}>
    //         <Card.Header>{review.title}</Card.Header>
    //         <Card.Body>
    //             <h5>{review.rating}</h5>
    //             <p>{review.startingPosition}</p>
    //             <p>{review.startingSalary}</p>
    //         </Card.Body>
    //         <Card.Footer>
    //             <Link className="btn btn-success" to={`/reviews/${review._id}`} >Read More</Link>
    //         </Card.Footer>
    //     </Card>
    // ))
    return (
        <div className="mt-5" style={{flex: 1, textAlign: "center", }}>
            
            <div  style={{overflow: "scroll", width: "33vw", margin: "auto", backgroundColor: "rgb(197,231,255)", border: "2px solid rgb(126,196,255)", height: "450px"}}>
                <div style={{backgroundColor: "rgb(152,212,255)", border: "2px solid rgb(126,196,255)", height: "50px"}}>
                    <h3>Reviews</h3> 
                </div>                
                {/* {reviewCards} */}
            </div>            
        </div>
    )
}

export default ReviewIndex