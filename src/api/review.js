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

export const reviewIndex = (companyId) => {
	return axios({
		method: 'GET',
		url: apiUrl + `/reviews/${companyId}`,
	})
}

export const reviewShow = (user, id) => {
	return axios({
		method: "GET",
		url: apiUrl + `/reviews/${id}`,
        headers: {
            Authorization: `Token token=${user.token}`
        }		
	})
}

export const reviewUpdate = (review, user, id) => {	
	return axios({
		method: 'PATCH',
		url: apiUrl + `/reviews/${id}`,
		data: {
			review: review
		},
        headers: {
            Authorization: `Token token=${user.token}`
        }
	})
}

export const reviewDelete = (user, id) => {
	console.log(id)
	return axios({
		method: 'DELETE',
		url: apiUrl + `/reviews/${id}`,
        headers: {
            Authorization: `Token token=${user.token}`
        }
	})
}