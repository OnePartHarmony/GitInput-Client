import apiUrl from "../apiConfig"
import axios from "axios"

export const reviewCreate = (review, user) => {
    return axios({
        method: "POST",
        url: apiUrl + "/reviews",
        data: {
            review: review
        },
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}