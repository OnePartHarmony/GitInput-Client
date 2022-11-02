import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CompanyForm from './CompanyForm'
import { companyUpdate } from '../../api/company'
import messages from '../shared/AutoDismissAlert/messages'


const EditCompanyModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh 
    } = props

    const [company, setCompany] = useState(props.company)
    

    const handleChange = (e) => {
        setCompany(prevCompany => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }
            const updatedCompany = { [updatedName]: updatedValue }

            return { ...prevCompany, ...updatedCompany }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        companyUpdate(company, user, props.company._id)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updateCompanySuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.updateCompanyFailure + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <CompanyForm 
                    company={company}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Company"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCompanyModal