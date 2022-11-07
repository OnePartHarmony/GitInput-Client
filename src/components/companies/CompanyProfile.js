import EditCompanyModal from "./EditCompanyModal"
import { useState } from 'react'
import { companyDelete } from "../../api/company"
import { useNavigate } from "react-router-dom"
import fiveStars from "../../fiveStars"


const CompanyProfile = (props) => {

    const [displayUpdate, setDisplayUpdate] = useState(false)
    const { company, toggleReviewForm, user, msgAlert, triggerRefresh, companyId, displayReviewCreate } = props
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
            <div className="d-flex flex-column align-items-center company-profile mb-3" style={{width: "33vw", margin: "auto", padding: "10px"}}>
                <div className="title-box">
                    <div className="profile-title">{company.name}</div>
                </div>

            {/* display stars based on rounded average rating */}
                {company.averageRating ? <h4>{fiveStars(Math.round(company.averageRating))}</h4> : null}                
                <img className="profile-logo" src={company.logo} alt={`${company.name} logo`}/>
                <p className="profile-description">{company.description} </p>
                <a href={`https://www.${company.domain}`} target="_blank"  rel="noreferrer" className="company-button">{company.domain}</a>

            {/* if signed in, the leave review button toggles form and becomes a close form button */}
                {user ? (displayReviewCreate ? 
                    <button className="company-button" onClick={toggleReviewForm}>Close Review Form</button>
                    :
                    <button className="company-button mt-2" onClick={toggleReviewForm}>Leave a Review</button>
                ) : null}
            </div>

            {/* user who created company can edit and delete */}
            {user && (user._id === company.owner) ?
                <div className="company-update-btns" style={{margin: 'auto', width: '400px'}}>
                    <button className='company-button' onClick={() => setDisplayUpdate(true)}>Edit Company</button>                
                {/* Delete button requires two steps to delete company */}
                    {isDeleteClicked ? 
                        <button className="company-button" onClick={deleteCompany}>I'm sure, DELETE</button>
                        :
                        <button className='company-button' onClick={() => setIsDeleteClicked(true)}>Delete Company</button>
                    }
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
