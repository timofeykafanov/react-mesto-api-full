class Api {
    constructor({address, token}) {
        this._address = address;
        this._token = token;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    } 

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            credentials: 'include',
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {
            return this._getResponseData(res);
        })
    }

    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            credentials: 'include',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            return this._getResponseData(res);
        })
    }

    setUserInfo(inputValues) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputValues.name,
                about: inputValues.about
            })
        })
        .then(res => {
            return this._getResponseData(res);
        })
    }

    setUserAvatar(inputValue) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: inputValue.avatar
            })
        })
        .then(res => {
            return this._getResponseData(res);
        })
    }

    setCard(inputValues) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputValues.name,
                link: inputValues.link
            })
        })
        .then(res => {
            return this._getResponseData(res);
        })
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.deleteLike(id);
        } else {
            return this.putLike(id);
        }
    }

    putLike(itemId) {
        return fetch(`${this._address}/cards/${itemId}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            return this._getResponseData(res);
        })
    }
    
    deleteLike(itemId) {
        return fetch(`${this._address}/cards/${itemId}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            return this._getResponseData(res);
        })
    }

    deleteCard(item) {
        return fetch(`${this._address}/cards/${item._id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                authorization: this._token
            },
        })
        .then(res => {
            return this._getResponseData(res);
        })
    }
}

const api = new Api({
    address: 'http://api.cartvelgram.students.nomoredomains.work',
    token: `Bearer ${localStorage.getItem('token')}`
    // token: '62434932-64a7-4dd4-b60b-76c0e0336349'
})

export default api;