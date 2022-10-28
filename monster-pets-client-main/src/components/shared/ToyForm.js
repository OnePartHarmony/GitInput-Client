import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const ToyForm = (props) => {
    const {toy, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                    placeholder="what's the toy's name?"
                    name="name"
                    id="name"
                    value= { toy.name }
                    onChange={ handleChange }
                />
                <Form.Label>Description:</Form.Label>
                <Form.Control 
                    placeholder="describe the toy..."
                    name="description"
                    id="description"
                    value= { toy.description }
                    onChange={ handleChange }
                />
                <Form.Check 
                    label="Is the toy squeaky?"
                    name="isSqueaky"
                    defaultChecked={ toy.isSqueaky }
                    onChange={ handleChange }
                />
                <Form.Select
                    aria-label="toy condition"
                    name="condition"
                    defaultValue={toy.condition}
                    onChange={handleChange}
                >
                    <option>Open this select menu</option>
                    <option value="new">new</option>
                    <option value="used">used</option>
                    <option value="disgusting">disgusting</option>
                </Form.Select>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ToyForm