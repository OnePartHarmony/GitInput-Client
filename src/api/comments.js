import apiUrl from "../apiConfig"
import axios from "axios"

export const commentCreate = (user, reviewId, comment) => {
    return axios({
        method: "POST",
        url: apiUrl + `/comments/:${reviewId}`,
        data: {
            comment: {comment: comment, authour: user._id}
        },
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}