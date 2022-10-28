import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
import { createToy } from '../../api/toys'

const NewToyModal = (props) => {
    const { 
        user, pet, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [toy, setToy] = useState({})

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

        createToy(user, pet._id, toy)
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
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton />
            <Modal.Body>
                <ToyForm 
                    toy={toy}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Give this pet a toy!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewToyModal