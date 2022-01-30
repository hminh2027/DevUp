import axios from 'axios'

export const postAPI = async (url, data, token) => {
    const res = await axios.post(`/api/${url}`, data, {
        headers: { Authorization: token}
    })
    return res
}

export const getAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: {Authorization: token}
    })
    return res
}

export const putAPI = async (url, data, token) => {
    const res = await axios.put(`/api/${url}`, data, {
        headers: {Authorization: token}
    })
    return res
}

export const patchAPI = async (url, data, token) => {
    const res = await axios.patch(`/api/${url}`, data, {
        headers: {Authorization: token}
    })
    return res
}

export const deleteAPI = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: {Authorization: token}
    })
    return res
}