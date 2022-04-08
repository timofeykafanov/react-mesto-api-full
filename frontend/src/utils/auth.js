export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

const HEADERS = {
    'Accept': 'application/json',
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
        mode: 'no-cors',
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email, password })
    })
        .then(getJson)
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, { mode: 'no-cors'}, {
        mode: 'no-cors',
        method: 'POST',
        headers: HEADERS,
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
        .then(getJson)
};

export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
        mode: 'no-cors',
        method: 'POST',
        headers: HEADERS,
        credentials: 'include',
    })
        .then(getJson)
};
