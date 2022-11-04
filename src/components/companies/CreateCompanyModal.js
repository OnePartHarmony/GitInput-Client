import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { companyCreate } from '../../api/company'
import CompanyForm from './CompanyForm'

function CreateCompanyModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user, msgAlert, triggerRefresh } = props

  const defaultCompany = {
    name: '',
    logo: '',
    domain: '',
    description: ''
}

const [company, setCompany] = useState(defaultCompany)

const handleChange = (event) => {
    setCompany({...company, [event.target.name]: event.target.value})
}

const handleCreateCompany = () => {
    companyCreate(company, user)
    .then(() => {
        msgAlert({
            heading: 'Success',
            message: 'Create Company',
            variant: 'success'
        })
        triggerRefresh()
        handleClose()
    })
    .catch((error) => {
        msgAlert({
            heading: 'Failure',
            message: 'Create Company Failure' + error,
            variant: 'danger'
        })
    })
}


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Company!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CompanyForm
              company={ company }
              handleChange={ handleChange }
              heading="Add a new Company!"
              handleSubmit={ handleCreateCompany }
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

export default CreateCompanyModal