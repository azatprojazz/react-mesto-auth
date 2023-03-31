class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _response(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  registerUser(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._response(res);
    });
  }

  loginUser(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._response(res);
    });
  }

  validateToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    }).then((res) => {
      return this._response(res);
    });
  }
}

export const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
});
