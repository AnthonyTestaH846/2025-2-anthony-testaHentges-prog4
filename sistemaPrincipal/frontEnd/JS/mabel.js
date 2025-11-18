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

// 1. Obtenha o contexto do canvas
const ctx = document.getElementById('meuGrafico').getContext('2d');

// 2. Crie o novo gráfico
const meuGrafico = new Chart(ctx, {
    // Defina o tipo de gráfico como 'line'
    type: 'line',

    // Dados para o gráfico
    data: {
        // Labels para o eixo X
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [{
            // Label para a legenda
            label: 'Vendas Mensais',
            // Dados para o eixo Y
            data: [12, 19, 3, 5, 2],
            // Cores e opções de estilo (opcional)
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
        }]
    },

    // Opções de configuração (opcional)
    options: {
        scales: {
            y: {
                beginAtZero: true // Começa o eixo Y no zero
            }
        }
    }
});

