let rules = {
  email: {
    identifier: "email",
    rules: [
      {
        type: "empty",
        prompt: "Ingrese su cuenta de usuario"
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
  }
};

function submitForm(fields) {
  $.ajax({
    type: "POST",
    url: "/api/auth/sign-in",
    dataType: "json",
    data: fields,
    success: res => {
      if (res.success && res.results) {
        window.location.href = "/";
      }
    },
    error: err => {
      let res = err.responseJSON;
      swal({ title: res.message, icon: "error" });
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
