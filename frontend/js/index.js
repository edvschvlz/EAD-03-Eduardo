const token = localStorage.getItem('token');

if (!token) {
  window.location.href = './login.html';
}

const openModalBtn = document.getElementById('add-user');
const closeModalBtn = document.getElementById('close');
const modal = document.getElementById('modal');

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = './login.html';
}

function disabledBtn() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const btnSave = document.getElementById('btnSave');

  const regex = /\S+@\S+\.\S+/;
  const emailValidated = regex.test(email);

  if (
    name.trim() !== '' &&
    email.trim() !== '' &&
    emailValidated &&
    password.trim() !== '' &&
    password.length > 6
  ) {
    btnSave.removeAttribute('disabled');
  } else {
    btnSave.setAttribute('disabled', 'true');
  }
}

function handleChange(event) {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const btnSave = document.getElementById('btnSave');
  const errorAlert = document.querySelector('#errorAlert');
  const successAlert = document.querySelector('#successAlert');

  event.preventDefault();

  const data = {
    name: name,
    email: email,
    password: password,
  };

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  btnSave.setAttribute('disabled', 'true');

  fetch(`http://localhost:5000/users`, options)
    .then((response) => {
      if (!response.ok) {
        btnSave.removeAttribute('disabled');
        successAlert.style.display = 'none';
        errorAlert.style.display = 'block';
        throw new Error('Não foi possível salvar informações!');
      }

      return response.json();
    })
    .then((data) => {
      btnSave.removeAttribute('disabled');
      errorAlert.style.display = 'none';
      successAlert.style.display = 'block';

      setTimeout(() => {
        return location.replace(location.href);
      }, 3000);
    })
    .catch(() => {
      btnSave.removeAttribute('disabled');
      successAlert.style.display = 'none';
      errorAlert.style.display = 'block';
      throw new Error('Não foi possível salvar informações!');
    });
}

function remove(id) {
  const options = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`http://localhost:5000/users/${id}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Não foi possível deletar informação!');
      }

      return location.replace(location.href);
    })
    .catch(() => {
      throw new Error('Não foi possível deletar informação!');
    });
}

(async () => {
  fetch(`http://localhost:5000/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Não foi possível buscar informações!');
      }
      return response.json();
    })
    .then((data) => {
      const users = document.querySelector('#users');
      console.log(data);
      new DataTable(users, {
        data: data,
        columns: [
          { data: 'name' },
          { data: 'email' },
          {
            data: 'null',
            render: function (data, type, row) {
              return `
              <div class="actions">
                <a style="font-size: 20px; cursor: pointer;" id="${row.id}" onClick="edit(this.id)"><i class="bi bi-pencil-fill"></i></a>
                <a style="font-size: 20px; cursor: pointer;" id="${row.id}" onClick="remove(this.id)"><i class="bi bi-trash-fill"></i></a>
              </div>`;
            },
          },
        ],
        columnDefs: [
          {
            className: 'dt-center',
            targets: '_all',
          },
        ],
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json',
          dom: '<"top"i>rt<"bottom"flp><"clear">',
        },
      });
    })
    .catch(() => {
      throw new Error('Não foi possível buscar informações!');
    });
})();
