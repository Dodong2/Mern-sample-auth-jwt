import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})
export const register = (username, gmail, password) => api.post('/register', {username, gmail, password})
export const login = (gmail, password) => api.post('/login', {gmail, password})
export const postText = (text) => api.post('/post', { text })
export const getPosts = () => api.get('/posts');