// Menu selecionado
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('selected'));
        
        item.classList.add('selected');
    });
});

const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
  const yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

  new Chart(document.getElementById("grafico01"), {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: "Exemplo",
        fill: false,
        tension: 0,
        backgroundColor: "rgba(0,0,255,1)",
        borderColor: "rgba(0,0,255,0.6)",
        data: yValues
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {  // 👈 Agora é 'y', não 'yAxes'
          min: 6,
          max: 16
        },
        x: {  // 👈 idem para 'x'
          title: {
            display: true,
            text: "Valores de X"
          }
        }
      }
    }
  });