import CompanyProfile from './CompanyProfile'
import ReviewIndex from '../reviews/ReviewIndex'
import { useState } from 'react'
import ReviewCreate from '../reviews/ReviewCreate'
import { useLocation } from 'react-router-dom';


const CompanyShow = (props) => {

    const location = useLocation();
    const company = location.state;

    const { msgAlert} = props

    const [displayReviewCreate, setDisplayReviewCreate] = useState(false)

    const toggleReviewForm = () => {
        setDisplayReviewCreate(prevValue => !prevValue)
    }
    if (!company) {
        return <p>Company not found</p>
    }
    return (
        <div style={{display: "flex"}}>
            <CompanyProfile company={company} showReviewForm={toggleReviewForm} />
            {displayReviewCreate ? <ReviewCreate company={company} closeReviewForm={toggleReviewForm} msgAlert={msgAlert}/> : <ReviewIndex company={company}/>}
        </div>
    )
}

export default CompanyShow