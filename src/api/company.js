import apiUrl from "../apiConfig"
import axios from "axios"

export const companyCreate = (company, user) => {
    return axios({
        method: "POST",
        url: apiUrl + "/companies",
        data: {
            company: company
        },
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}