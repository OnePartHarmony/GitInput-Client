import { Form } from 'react-bootstrap'

const CommentForm = (props) => {

    const { handleChange, handleSubmit, comment } = props

    return (
        <>
            <div className="text-end">
            <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your comment here"
                value={comment}
                onChange= { handleChange }
            />
            <button className="company-button mt-3 mb-0" onClick={() => handleSubmit()}>Submit</button>
            </div>
        </>
    )
}

export default CommentForm