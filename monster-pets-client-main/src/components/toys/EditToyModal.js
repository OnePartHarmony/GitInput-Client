import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
import { updateToy } from '../../api/toys'

const EditToyModal = (props) => {
    const { 
        user, pet, show, handleClose, msgAlert, triggerRefresh, currentToy
    } = props

    const [toy, setToy] = useState(currentToy)

    const handleChange = (e) => {
        setToy(prevToy => {
            const name = e.target.name
            let value = e.target.value

            // handle the checkbox
            if (name === "isSqueaky" && e.target.checked) {
                value = true
            } else if (name === "isSqueaky" && !e.target.checked) {
                value = false
            }

            const updatedToy = { [name]: value }

            return {
                ...prevToy, ...updatedToy
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateToy(user, pet._id, toy)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: 'Great! The toy is updated!',
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
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton />
            <Modal.Body>
                <ToyForm 
                    toy={toy}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit the toy"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditToyModal