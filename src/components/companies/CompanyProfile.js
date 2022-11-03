import EditCompanyModal from "./EditCompanyModal"
import { useState } from 'react'
import { Button } from "react-bootstrap"
import { companyDelete } from "../../api/company"
import { useNavigate } from "react-router-dom"


const CompanyProfile = (props) => {

    const [displayUpdate, setDisplayUpdate] = useState(false)
    const { company, showReviewForm, user, msgAlert, triggerRefresh, companyId } = props
    const [isDeleteClicked, setIsDeleteClicked] = useState(false)

    const navigate = useNavigate()

    const deleteCompany = (e) => {
        e.preventDefault()
        companyDelete(user, companyId)
            .then(() => {
                msgAlert({
                    heading: "Success!",
                    message: "Deleted review.",
                    variant: "success"
                })
                navigate(`/companies`)
            })
            .catch((err) => {
                msgAlert({
                    heading: "Failure",
                    message: "Failed to delete company: " + err,
                    variant: "danger"
                })
            })
    }

    return (
        <div className="mt-5" style={{ flex: 1, textAlign: "center" }}>
            <div className="mb-5" style={{ backgroundColor: "rgb(197,231,255)", border: "2px solid rgb(114,195,255)", width: "33vw", margin: "auto", padding: "10px" }}>
                <h3>{company.name}</h3>
                {company.averageRating ? <h4>company.averageRating</h4> : null}
                <img src={company.logo} alt={`${company.name} logo`} />
                <p>{company.description} </p>
                <h5>{company.domain}</h5>
            </div>
            {user ? <button className="btn btn-primary" onClick={showReviewForm}>Leave a Review</button> : null}
            {user && (user._id === company.owner) ?
                <div>
                    <Button className='btn-success btn' onClick={() => setDisplayUpdate(true)}>Edit Company</Button>
                    {isDeleteClicked ? <Button className="btn-danger" onClick={deleteCompany}>I'm sure, DELETE</Button> : <Button className='btn-warning' onClick={() => setIsDeleteClicked(true)}>Delete this Company?</Button>}
                </div>
                : null}
            <EditCompanyModal
                currentCompany={company}
                msgAlert={msgAlert}
                closeUpdate={() => setDisplayUpdate(false)}
                triggerRefresh={triggerRefresh}
                showUpdate={displayUpdate}
                user={user} 
                companyId={companyId}/>
        </div>
    )
}

export default CompanyProfile