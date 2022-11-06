import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { companyCreate } from '../../api/company'
import CompanyForm from './CompanyForm'

function CreateCompanyModal(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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

  const handleCreateCompany = (e) => {
    e.preventDefault()
    companyCreate(company, user)
    .then(() => {
      handleClose()
      triggerRefresh()
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
      <button className="search-btn mt-3" onClick={handleShow}>
        Create Company!
      </button>

      <Modal className="mt-5" show={show} onHide={handleClose}>
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
      </Modal>
    </>
  );
}

export default CreateCompanyModal