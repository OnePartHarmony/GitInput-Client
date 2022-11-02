import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CompanyCreate from "./CompanyCreate"
import { companyCreate } from '../../api/company'


// const handleSubmit = (e) => {
//   e.preventDefault()

//   createCompany(user, company._id)
//     .then(() => handleClose())
//     .then(() => {
//       msgAlert({
//         heading: 'Oh yeah!',
//         message: 'Great! The pet loves it!',
//         variant: 'success'
//       })
//     })
//     .then(() => triggerRefresh())
//     .catch(() => {
//       msgAlert({
//         heading: 'Oh No!',
//         message: 'Something went wrong! Please try again',
//         variant: 'danger'
//       })
//     })
// }

function CreateCompanyModal(props) {
  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    user, handleClose, msgAlert, triggerRefresh
  } = props

  const [company, setCompany] = useState({})

  const handleChange = (e) => {
    setCompany(prevCompany => {
      const name = e.target.name
      let value = e.target.value

    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    companyCreate(user, company)
      .then(() => handleClose())
      .then(() => {
        msgAlert({
          heading: 'Oh yeah!',
          message: 'Great! The pet loves it!',
          variant: 'success'
        })
      })
      .then(() => triggerRefresh())
      .catch(() => {
        msgAlert({
          heading: 'Oh No!',
          message: 'Something went wrong! Please try again',
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
        <Modal.Body> <CompanyCreate user={user} msgAlert={msgAlert}
        /> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateCompanyModal