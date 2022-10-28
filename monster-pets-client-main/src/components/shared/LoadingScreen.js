import React from "react"
import { Spinner } from "react-bootstrap"

const LoadingScreen = () => {
    return (
        <div style={{textAlign: "center"}}>
            <Spinner role="status" animation="border">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default LoadingScreen