import { Form, Button } from 'react-bootstrap'

const CommentForm = (props) => {

    const { handleChange, handleSubmit, comment } = props

    return (
        <>
            <Form.Control
                placeholder="Enter your comment here"
                value={comment}
                onChange= { handleChange }
            />
            <Button onClick={() => handleSubmit()}>Submit</Button>
        </>
    )
}

export default CommentForm