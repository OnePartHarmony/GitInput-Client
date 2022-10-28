import apiUrl from '../apiConfig'
import axios from 'axios'

export const petCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/pets',
		data: {
			pet: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const petIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/pets'
	})
}

export const petShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/pets/' + id
	})
}

export const petUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/pets/' + id,
		data: {
			pet: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const petDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/pets/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}