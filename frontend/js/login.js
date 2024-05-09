const token = localStorage.getItem('token');

if (token) {
  window.location.href = './index.html';
}

function disabledBtn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const btnLogin = document.getElementById('btnLogin');

  const regex = /\S+@\S+\.\S+/;
  const emailValidated = regex.test(email);

  if (email.trim() !== '' && emailValidated && password.trim() !== '' && password.length > 6) {
    btnLogin.removeAttribute('disabled');
  } else {
    btnLogin.setAttribute('disabled', 'true');
  }
}

function handleChange(event) {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const btnLogin = document.querySelector('#btnLogin');
  const errorAlert = document.querySelector('#errorAlert');

  event.preventDefault();

  const data = {
    email: email,
    password: password,
  };

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  btnLogin.setAttribute('disabled', 'true');

  fetch(`http://localhost:5000/session/auth`, options)
    .then((response) => {
      if (!response.ok) {
        btnLogin.removeAttribute('disabled');
        errorAlert.style.display = 'block';
        throw new Error('Não foi possível salvar informações!');
      }

      return response.json();
    })
    .then((data) => {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      errorAlert.style.display = 'none';

      setTimeout(() => {
        window.location.href = './index.html';
      }, 400);
    })
    .catch(() => {
      btnLogin.removeAttribute('disabled');
      errorAlert.style.display = 'block';
      throw new Error('Não foi possível salvar informações!');
    });
}
