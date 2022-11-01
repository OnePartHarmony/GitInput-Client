import CompanyProfile from './CompanyProfile'
import ReviewIndex from '../reviews/ReviewIndex'
import { useEffect, useState } from 'react'
import ReviewCreate from '../reviews/ReviewCreate'
import {companyShow} from "../../api/company"
import { useParams } from 'react-router-dom'

const CompanyShow = (props) => {

    const {msgAlert} = props
    const {id} = useParams()

    const [company, setCompany] = useState({})
    const [displayReviewCreate, setDisplayReviewCreate] = useState(false)

    useEffect(() => {
        companyShow(id)
            .then(res => {
                setCompany(res.data.company)
            })
            .catch((err) => {
                msgAlert({
                    heading: "Failure",
                    message: "Failed to find company" + err,
                    variant: "danger"
                })
            })
    }, [])

    const toggleReviewForm = () => {
        setDisplayReviewCreate(prevValue => !prevValue)
    }

    if (company == {}) {
        return(
            <>Loading...</>
        )
    }

    return (
        <div style={{display: "flex"}}>
            <CompanyProfile company={company} showReviewForm={toggleReviewForm} />
            {displayReviewCreate ? <ReviewCreate company={company} closeReviewForm={toggleReviewForm} msgAlert={msgAlert}/> : <ReviewIndex company={company}/>}
        </div>
    )
}

export default CompanyShow