import apiUrl from "../apiConfig"
import axios from "axios"

export const reviewCreate = (review, user, companyId) => {
    return axios({
        method: "POST",
        url: apiUrl + `/reviews`,
        data: {
            review: {
                ...review,
                owner: user._id,
                company: companyId
            } 
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

export const reviewShow = (id) => {
	return axios({
		method: "GET",
		url: apiUrl + `/reviews/${id}`,	
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