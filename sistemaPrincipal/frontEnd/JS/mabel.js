  //Formulário
  document.getElementById("filterForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const start = new Date(document.getElementById("dataInicio").value);
    const end = new Date(document.getElementById("dataFim").value);
    const error = document.getElementById("errorMsg");

    if (start > end) {
      alert("A data inicial não pode ser maior que a data final.");
      return
    }

    else{
      fetch("../../backEnd/ptqa.php")
        .then(res => {
            console.log("RES (raw HTTP Response):", res);
            return res.json();
        })
        .then(data => {
        })
  }

    error.textContent = "";
});
