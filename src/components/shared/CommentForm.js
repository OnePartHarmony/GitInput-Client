import { Form, Button } from 'react-bootstrap'

const CommentForm = (props) => {

    const { handleChange, handleSubmit } = props

    return (
        <>
            <Form.Control
                placeholder="Enter your comment here"
                onChange= { handleChange }
            />
            <Button onClick={() => handleSubmit()}>Submit</Button>
        </>
    )
}

export default CommentForm