export const BASE_URL = 'https://auth.nomoreparties.co';

const HEADERS = {
    'Content-Type': 'application/json'
};

const getJson = (response) => {
    if (response.ok) {
        return response.json();
    }
    throw new Error({ status: response.status });
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email, password })
    })
        .then(getJson)
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email, password })
    })
        .then(getJson)
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            ...HEADERS,
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(getJson)
}