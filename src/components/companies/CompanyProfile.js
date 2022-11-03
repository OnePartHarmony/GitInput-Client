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

        <>
        <style>{'body { height:100vh; width:100vw; background-color: rgba(159, 159, 159, .3); background-image: linear-gradient(60deg, rgba(237, 237, 237, 1) 35%, transparent 30%), linear-gradient(-400deg, rgba(202, 235, 242, .7) 40%, transparent 30%);}'}</style>

        <div className="mt-5" style={{flex: 1, textAlign: "center"}}>
            <div className="d-flex flex-column align-items-center company-profile mb-5" style={{width: "33vw", margin: "auto", padding: "10px"}}>
                <div className="title-box">
                    <div className="profile-title">{company.name}</div>
                </div>
                {company.averageRating ? <h4>company.averageRating</h4> : null}
                <img className="profile-logo" src={company.logo} alt={`${company.name} logo`}/>
                <p className="profile-description">{company.description} </p>
                <a href={`https://www.${company.domain}`} target="_blank" className="company-button">{company.domain}</a>

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
        </>
    )
}

export default CompanyProfile