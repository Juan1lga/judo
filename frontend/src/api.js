import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (username, password) => {
    try {
        const response = await api.post('token/', { username, password });
        return response;
    } catch (err) {
        throw err;
    }
};

export const createCompetitor = async (data) => {
    try {
        console.log('Sending POST to /api/competitors/', data);
        const response = await api.post('competitors/', data);
        console.log('Response from createCompetitor:', response.data);
        return response;
    } catch (err) {
        console.error('Error in createCompetitor:', err.response?.data || err.message);
        throw err;
    }
};

export const createCompetition = async (data) => {
    try {
        console.log('Sending POST to /api/competitions/', data);
        const response = await api.post('competitions/', data);
        console.log('Response from createCompetition:', response.data);
        return response;
    } catch (err) {
        console.error('Error in createCompetition:', err.response?.data || err.message);
        throw err;
    }
};

export const getCompetitorStats = async (competitorId) => {
    try {
        const response = await api.get(`statistics/competitor_stats/?competitor_id=${competitorId}`);
        return response;
    } catch (err) {
        console.error('Error in getCompetitorStats:', err.response?.data || err.message);
        throw err;
    }
};

export const compareCompetitors = async (competitor1Id, competitor2Id) => {
    try {
        const response = await api.get(`statistics/compare_competitors/?competitor1_id=${competitor1Id}&competitor2_id=${competitor2Id}`);
        return response;
    } catch (err) {
        console.error('Error in compareCompetitors:', err.response?.data || err.message);
        throw err;
    }
};