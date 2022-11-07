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
export const companyIndex = () => {
	return axios({
		method: 'GET',
		url: apiUrl + '/companies'
	})
}

export const companyShow = (id) => {
	return axios({
		method: "GET",
		url: apiUrl + `/companies/${id}`		
	})
}

export const companyUpdate = (company, user, id) => {	
	return axios({
		method: 'PATCH',
		url: apiUrl + `/companies/${id}`,
		data: {
			company: company
		},
        headers: {
            Authorization: `Bearer ${user.token}`
        }
	})
}

export const companyDelete = (user, id) => {
	console.log(id)
	return axios({
		method: 'DELETE',
		url: apiUrl + `/companies/${id}`,
        headers: {
            Authorization: `Bearer ${user.token}`
        }
	})
}