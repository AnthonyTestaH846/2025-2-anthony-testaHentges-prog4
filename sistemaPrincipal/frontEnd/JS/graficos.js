// Inputs
const botaoData = document.getElementById("botaoData");
const dataInicialEl = document.getElementById("dataInicial");
const dataFinalEl = document.getElementById("dataFinal");
const paragrafoErroGrafico = document.getElementById("pErro");
const selectMabel = document.getElementById("selectMabel");
const selectPTQA = document.getElementById("selectPTQA");
const filtrofreq = document.getElementById("filtrofreq");

let dataInicial = null;
let dataFinal = null;
let consultaSelecionada = null;
let pasta = "";
let graficoAtual = null;

// CONSULTAS (Mantive sua estrutura original)
const consultas = {
    1:  { arquivo: "1.2ptqa", legenda: "Baixa AQI", tipoGrafico: "line" },
    2:  { arquivo: "1.3ptqa", legenda: "Umidade>70%", tipoGrafico: "bar" },
    3:  { arquivo: "1.4ptqa", legenda: "CO2 < 1000", tipoGrafico: "bar" },
    4:  { arquivo: "1.5ptqa", legenda: "Pressão < 1000", tipoGrafico: "bar" },
    5:  { arquivo: "1.6ptqa", legenda: "Gases acima de 200", tipoGrafico: "bar" },
    6:  { arquivo: "2.1ptqa", legenda: "Temp Media", tipoGrafico: "bar" },
    7:  { arquivo: "2.2ptqa", legenda: "Umidade media", tipoGrafico: "bar" },
    8:  { arquivo: "2.3ptqa", legenda: "Máxima concentração CO2", tipoGrafico: "bar" },
    9:  { arquivo: "2.4ptqa", legenda: "Mín pressão", tipoGrafico: "bar" },
    10: { arquivo: "2.5ptqa", legenda: "Otima AQI", tipoGrafico: "bar" },
    11: { arquivo: "2.6ptqa", legenda: "Temp Min, med, max", tipoGrafico: "bar" },
    12: { arquivo: "2.7ptqa", legenda: "Media Gases", tipoGrafico: "bar" },
    13: { arquivo: "2.8ptqa", legenda: "maior concentração co2", tipoGrafico: "bar" },

    14: { arquivo: "1.2mabel", legenda: "Temperatura Interna", tipoGrafico: "bar" },
    15: { arquivo: "1.3mabel", legenda: "Temperatura Externa", tipoGrafico: "line" },
    16: { arquivo: "1.4mabel", legenda: "Umidade Interna", tipoGrafico: "line" },
    17: { arquivo: "1.5mabel", legenda: "Umidade Externa", tipoGrafico: "line" },
    18: { arquivo: "1.6mabel", legenda: "Temperatura do Ninho", tipoGrafico: "line" },
    19: { arquivo: "1.7mabel", legenda: "Umidade e Temperatura Interna e Externa", tipoGrafico: "line" },
    20: { arquivo: "2.1mabel", legenda: "Temperatura Interna Média", tipoGrafico: "bar" },
    21: { arquivo: "2.2mabel", legenda: "Temperatura Externa Média", tipoGrafico: "bar" },
    22: { arquivo: "2.3mabel", legenda: "Umidade Interna Média", tipoGrafico: "bar" },
    23: { arquivo: "2.4mabel", legenda: "Umidade Externa Média", tipoGrafico: "bar" },
    24: { arquivo: "2.5mabel", legenda: "Temperatura Máxima do Ninho", tipoGrafico: "bar" },
    25: { arquivo: "2.6mabel", legenda: "Temperatura Mínima do Ninho", tipoGrafico: "bar" },
    26: { arquivo: "2.7mabel", legenda: "Diferença Média Temperatura Interna e Externa", tipoGrafico: "bar" },
    27: { arquivo: "2.8mabel", legenda: "Média Diária Temperatura Interna", tipoGrafico: "bar" },
    28: { arquivo: "2.9mabel", legenda: "Média Diária Umidade Interna", tipoGrafico: "bar" }
};

// Configuração inicial baseada no Select existente na página
if (selectPTQA) {
    consultaSelecionada = consultas[selectPTQA.value || 1];
    pasta = "ptqa";
    selectPTQA.addEventListener("change", () => {
        consultaSelecionada = consultas[selectPTQA.value];
    });
} else if (selectMabel) {
    consultaSelecionada = consultas[selectMabel.value || 14];
    pasta = "mabel";
    selectMabel.addEventListener("change", () => {
        consultaSelecionada = consultas[selectMabel.value];
    });
}

// Função Principal
function chamarBackend(event) {
    event.preventDefault();

    const inicio = dataInicialEl.value;
    const fim = dataFinalEl.value;
    const freq = filtrofreq.value;

    // Validações
    if (!inicio || !fim) {
        paragrafoErroGrafico.innerText = "Por favor, preencha as duas datas.";
        return;
    }
    if (inicio > fim) {
        paragrafoErroGrafico.innerText = "A data inicial não pode ser maior que a final.";
        return;
    }
    if (freq <= 0) {
        paragrafoErroGrafico.innerText = "O filtro de dias deve ser maior que 0.";
        return;
    }

    paragrafoErroGrafico.innerText = "Carregando dados...";

    // Construção da URL (ajuste o localhost se necessário)
    const url = `http://localhost/sistemaPrincipal/backEnd/${pasta}/${consultaSelecionada.arquivo}.php?` + 
                `dataInicial=${inicio}&dataFinal=${fim}&filtrofreq=${freq}`;

    console.log("Buscando dados em:", url);

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Erro na resposta do servidor");
            return res.json();
        })
        .then(data => {
            console.log("Dados recebidos:", data);
            
            if (!data || data.length === 0) {
                paragrafoErroGrafico.innerText = "Nenhum dado encontrado para este período.";
                if (graficoAtual) {
                    graficoAtual.destroy();
                    graficoAtual = null;
                }
                return;
            }

            paragrafoErroGrafico.innerText = ""; // Limpa erros

            // Detectar campos de data/hora
            let campoData = "dataleitura"; // Default PTQA
            let campoHora = "horaleitura";
            
            if (pasta === "mabel") {
                campoData = "datainclusao";
                campoHora = "horainclusao";
            }

            // Preparar Labels (Eixo X)
            const labels = data.map(d => {
                // Formatação simples de data/hora se existir
                const dt = d[campoData] || "";
                const hr = d[campoHora] || "";
                return `${dt} ${hr}`.trim();
            });

            // Preparar Datasets (Eixo Y) - Pega todas as colunas exceto data/hora
            const chaves = Object.keys(data[0]);
            const colunasValidas = chaves.filter(k => k !== campoData && k !== campoHora);
            
            // Cores automáticas para múltiplas linhas
            const cores = ['#0a8f41', '#e0c15c', '#36a2eb', '#ff6384'];

            const datasets = colunasValidas.map((col, index) => ({
                label: col,
                data: data.map(d => d[col]),
                borderWidth: 2,
                backgroundColor: consultaSelecionada.tipoGrafico === 'bar' ? cores[index % cores.length] : 'transparent',
                borderColor: cores[index % cores.length],
                tension: 0.3 // Suaviza linhas
            }));

            // Renderizar Gráfico
            if (graficoAtual) graficoAtual.destroy();

            const ctx = document.getElementById("graficoGerado").getContext("2d");

            graficoAtual = new Chart(ctx, {
                type: consultaSelecionada.tipoGrafico,
                data: { labels, datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // CRUCIAL PARA A ALTURA FUNCIONAR
                    plugins: {
                        title: {
                            display: true,
                            text: consultaSelecionada.legenda,
                            font: { size: 18, family: "'Poppins', sans-serif" },
                            padding: { top: 10, bottom: 20 }
                        },
                        legend: {
                            position: 'top'
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        x: {
                            ticks: { maxRotation: 45, minRotation: 45 },
                            grid: { display: false }
                        },
                        y: {
                            beginAtZero: true,
                            grid: { color: '#e5e5e5' }
                        }
                    }
                }
            });
        })
        .catch(err => {
            console.error(err);
            paragrafoErroGrafico.innerText = "Erro ao conectar com o servidor.";
        });
}

// Event Listener
if(botaoData) {
    botaoData.addEventListener("click", chamarBackend);
}