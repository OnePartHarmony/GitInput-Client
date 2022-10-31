import CompanyProfile from './CompanyProfile'
import ReviewIndex from '../reviews/ReviewIndex'
import { useState } from 'react'
import ReviewCreate from '../reviews/ReviewCreate'

const CompanyShow = (props) => {

    const {company, msgAlert} = props
    
    const [displayReviewCreate, setDisplayReviewCreate] = useState(false)

    const toggleReviewForm = () => {
        setDisplayReviewCreate(prevValue => !prevValue)
    }

    return (
        <div style={{display: "flex"}}>
            <CompanyProfile company={company} showReviewForm={toggleReviewForm} />
            {displayReviewCreate ? <ReviewCreate company={company} closeReviewForm={toggleReviewForm} msgAlert={msgAlert}/> : <ReviewIndex company={company}/>}
        </div>
    )
}

export default CompanyShow