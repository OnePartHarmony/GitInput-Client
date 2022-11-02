import apiUrl from "../apiConfig"
import axios from "axios"

export const commentCreate = (review, user) => {
    return axios({
        method: "POST",
        url: apiUrl + "/comments/:reviewId",
        data: {
            review: review
        },
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}