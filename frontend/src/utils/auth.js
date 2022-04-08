export const BASE_URL = 'http://api.cartvelgram.students.nomoredomains.work';

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
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
        .then(getJson)
};

export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: 'POST',
        headers: HEADERS,
        credentials: 'include',
    })
        .then(getJson)
};

// export const checkToken = () => {
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         headers: HEADERS,
//         credentials: 'include',
//     })
//         .then(getJson)
// };