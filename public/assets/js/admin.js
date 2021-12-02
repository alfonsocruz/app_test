function logout(e) {
  e.preventDefault();

  $.ajax({
    type: "POST",
    url: "/api/auth/logout",
    dataType: "json",
    data: {},
    success: res => {
      if (res.success && res.results) {
        window.location.href = "/login";
      }
    },
    error: err => {
      let res = err.responseJSON;
      swal({ title: res.message, icon: "error" });
    }
  });
}

$(document).ready(function() {
  $("#logout").on("click", e => {
    logout(e);
  });
});
