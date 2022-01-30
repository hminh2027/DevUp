import axios from 'axios'
export const postAPI = async (url, data, token) => {
    const res = await axios.post(`nodejs-dev-up.herokuapp.com/api/${url}`, data, {
        headers: { Authorization: token}
    })
    return res
}

export const getAPI = async (url, token) => {
    const res = await axios.get(`nodejs-dev-up.herokuapp.com/api/${url}`, {
        headers: {Authorization: token}
    })
    return res
}

export const putAPI = async (url, data, token) => {
    const res = await axios.put(`nodejs-dev-up.herokuapp.com/api/${url}`, data, {
        headers: {Authorization: token}
    })
    return res
}

export const patchAPI = async (url, data, token) => {
    const res = await axios.patch(`nodejs-dev-up.herokuapp.com/api/${url}`, data, {
        headers: {Authorization: token}
    })
    return res
}

export const deleteAPI = async (url, token) => {
    const res = await axios.delete(`nodejs-dev-up.herokuapp.com/api/${url}`, {
        headers: {Authorization: token}
    })
    return res
}