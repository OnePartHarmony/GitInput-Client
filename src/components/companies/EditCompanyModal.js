import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { companyUpdate } from '../../api/company'
import CompanyForm from './CompanyForm'

function EditCompanyModal(props) {

  const {currentCompany, msgAlert, showUpdate, closeUpdate, user, companyId, triggerRefresh} = props
  

  const [company, setCompany] = useState(currentCompany)
 
  // currentCompany initially gets set as {} and needs to be updated when changed, else the form won't render default values.
  useEffect(() => {
    setCompany(currentCompany)
  },[currentCompany])

  const handleChange = (e) => {
      setCompany(prevCompany => {
          return({...prevCompany, [e.target.name]: e.target.value})
      })
  }

  const updateCompany = (e) => {
    e.preventDefault()
    companyUpdate(company, user, companyId)
    .then(() => {
        triggerRefresh()
        closeUpdate()
    })
        .catch((err) => {
            msgAlert({
                heading: 'Failure',
                message: 'Failed to update company.' + err,
                variant: 'danger'
            })
        })
}


  return (
    <>
      <Modal show={showUpdate} onHide={closeUpdate}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CompanyForm
              company={ company }
              handleChange={ handleChange }
              heading="Add a new Company!"
              handleSubmit={ updateCompany}
          />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCompanyModal