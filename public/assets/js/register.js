let rules = {
  first_name: {
    identifier: "first_name",
    rules: [
      {
        type: "empty",
        prompt: "Ingrese un Nombre"
      },
      {
        type: "length[3]",
        prompt: "El nombre debe tener al menos 3 caracteres"
      }
    ]
  },
  last_name: {
    identifier: "last_name",
    rules: [
      {
        type: "empty",
        prompt: "Ingrese un Apellido"
      },
      {
        type: "length[2]",
        prompt: "El apellido debe tener al menos 2 caracteres"
      }
    ]
  },
  email: {
    identifier: "email",
    rules: [
      {
        type: "empty",
        prompt: "Ingrese una cuenta de usuario"
      },
      {
        type: "email",
        prompt: "Ingrese un email válido"
      }
    ]
  },
  password: {
    identifier: "password",
    rules: [
      {
        type: "empty",
        prompt: "Ingrese su contraseña"
      },
      {
        type: "length[6]",
        prompt: "La contraseña debe tener al menos 6 caracteres"
      }
    ]
  },
  confirm: {
    identifier: "confirm",
    rules: [
      {
        type: "empty",
        prompt: "Confirme su contraseña"
      },
      {
        type: "match[password]",
        prompt: "La contraseña no coincide"
      }
    ]
  }
};

function submitForm(fields) {
  $.ajax({
    type: "POST",
    url: "/api/auth/sign-up",
    dataType: "json",
    data: fields,
    success: response => {
      if (response.success && response.results) {
        window.location.href = "login";
      }
    },
    error: err => {
      let res = err.responseJSON;
      swal({ title: res.message, icon: "warning" });
    }
  });
}

$(document).ready(function() {
  $(".ui.form").form({
    fields: rules,
    inline: true,
    on: "blur",
    onSuccess: function(event, fields) {
      event.preventDefault();
      submitForm(fields);
    }
  });
});
