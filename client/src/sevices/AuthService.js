const auth = {
  isAuthenticated: false,
  checkLogin :async function() {

    const isLoginIn = await fetch('/api/auth/checkLogin', {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())

    if(isLoginIn) {
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }

  },
  logout: async function() {

    const islogoutSucc = await fetch('/api/auth/logout', {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())

    if(islogoutSucc) {
      this.isAuthenticated = false;
      return true;
    } else {
      return false;
    }

  },
  login: async function(email, password) {

    const loginResponce = await fetch('/api/auth/login', {
      method: 'post',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });

    if(loginResponce.ok) {
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

}

export default auth;