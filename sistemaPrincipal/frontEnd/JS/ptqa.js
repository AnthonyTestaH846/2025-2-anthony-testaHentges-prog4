  //Formulário
  document.getElementById("filterForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const start = new Date(document.getElementById("data_inicio").value);
    const end = new Date(document.getElementById("data_fim").value);
    const error = document.getElementById("errorMsg");

    if (start > end) {
      alert("A data inicial não pode ser maior que a data final.");
      return
    }

    error.textContent = "";
});
