import CompanyProfile from './CompanyProfile'
import ReviewIndex from '../reviews/ReviewIndex'
import { useEffect, useState } from 'react'
import ReviewCreate from '../reviews/ReviewCreate'
import {companyShow} from "../../api/company"
import { useParams } from 'react-router-dom'

const CompanyShow = (props) => {

    const {msgAlert, user} = props
    const {id} = useParams()
    const [company, setCompany] = useState({})
    const [displayReviewCreate, setDisplayReviewCreate] = useState(false)
    const [updated, setUpdated] = useState(false)

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
    }, [updated, id, msgAlert])

    const toggleReviewForm = () => {
        setDisplayReviewCreate(prevValue => !prevValue)
    }

    if (company === {}) {
        return(
            <>Loading...</>
        )
    }

    return (
        <>
        <div style={{display: "flex"}}>
            <CompanyProfile company={company} msgAlert={msgAlert} companyId={id} showReviewForm={toggleReviewForm} user={user} triggerRefresh={()=> setUpdated (prevValue=>!prevValue)}/>

            {displayReviewCreate ? <ReviewCreate company={company} companyId={id} closeReviewForm={toggleReviewForm} msgAlert={msgAlert} user={user}/> : <ReviewIndex companyId={id} msgAlert={msgAlert}/>}
        </div>
        </>
    )
}

export default CompanyShow
