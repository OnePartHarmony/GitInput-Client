import apiUrl from "../apiConfig"
import axios from "axios"


export const commentCreate = (user, reviewId, comment) => {
    console.log('this is running', user, reviewId, comment)
    return axios({
        method: "POST",
        url: apiUrl + `/comments/${reviewId}`,
        data: {
            comment: comment, owner: user._id
        },
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

export const commentDelete = (user, reviewId, commentId) => {
    return axios({
        method: "DELETE",
        url: apiUrl + `/delete/${reviewId}/${commentId}`,
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

