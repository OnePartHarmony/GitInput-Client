import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { companyUpdate } from '../../api/company'
import CompanyForm from './CompanyForm'

function EditCompanyModal(props) {
//   const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
const {currentCompany, msgAlert, showUpdate, closeUpdate, user, companyId, triggerRefresh} = props


  const [company, setCompany] = useState(currentCompany)

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
        .then(() => {
            msgAlert({
                heading: 'Success!',
                message: 'Your company has been updated.',
                variant: 'success'
            })
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
      {/* <Button variant="primary" onClick={closeUpdate}>
       Update Company!
      </Button> */}

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
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCompanyModal