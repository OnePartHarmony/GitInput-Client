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
		url: apiUrl + `/reviews/show/${id}`,	
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
	return axios({
		method: 'DELETE',
		url: apiUrl + `/reviews/${id}`,
        headers: {
            Authorization: `Token token=${user.token}`
        }
	})
}


export const reviewLike = (user, reviewId) => {
    return axios({
        method: 'PATCH',
        url: apiUrl + `/reviews/like/${reviewId}`,
        data: {
            userId: user._id
        },
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

export const reviewUnlike = (user, reviewId) => {
    return axios({
        method: 'PATCH',
        url: apiUrl + `/reviews/unlike/${reviewId}`,
        data: {
            userId: user._id
        },
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}