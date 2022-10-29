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
export const companyIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/companies',
		headers: {
            Authorization: `Token token=${user.token}`
        }
	})
}

export const reviewShow = (user, id) => {
	return axios({
		method: "GET",
		url: apiUrl + `/companies/${id}`,
        headers: {
            Authorization: `Token token=${user.token}`
        }		
	})
}

export const companyUpdate = (review, user, id) => {	
	return axios({
		method: 'PATCH',
		url: apiUrl + `/companies/${id}`,
		data: {
			review: review
		},
        headers: {
            Authorization: `Token token=${user.token}`
        }
	})
}

export const companyDelete = (user, id) => {
	console.log(id)
	return axios({
		method: 'DELETE',
		url: apiUrl + `/companies/${id}`,
        headers: {
            Authorization: `Token token=${user.token}`
        }
	})
}