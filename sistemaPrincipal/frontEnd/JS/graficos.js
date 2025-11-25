// Inputs 
let botaoData = document.getElementById("botaoData");
let dataInicial = document.getElementById("dataInicial");
let dataFinal = document.getElementById("dataFinal");
let paragrafoErroGrafico = document.getElementById("pErro");
let selectMabel = document.getElementById("selectMabel");
let selectPTQA = document.getElementById("selectPTQA");
let consultaSelecionada = null;
let pasta = "";

// CONSULTAS (legenda preservada)
const consultas = {
    1:  { arquivo: "1.2ptqa", legenda: "Baixa AQI" },
    2:  { arquivo: "1.3ptqa", legenda: "Umidade>70%" },
    3:  { arquivo: "1.4ptqa", legenda: "CO2 >1000" },
    4:  { arquivo: "1.5ptqa", legenda: "Pressão < 1000" },
    5:  { arquivo: "1.6ptqa", legenda: "Gases acima de 200" },
    6:  { arquivo: "2.1ptqa", legenda: "Temp Media" },
    7:  { arquivo: "2.2ptqa", legenda: "Umidade media" },
    8:  { arquivo: "2.3ptqa", legenda: "Máxima concentração CO2" },
    9:  { arquivo: "2.4ptqa", legenda: "Mín pressão" },
    10: { arquivo: "2.5ptqa", legenda: "Otima AQI" },
    11: { arquivo: "2.6ptqa", legenda: "Temp Min, med, max" },
    12: { arquivo: "2.7ptqa", legenda: "Media Gases" },
    13: { arquivo: "2.8ptqa", legenda: "maior concentração co2" },

    14: { arquivo: "1.2mabel", legenda: "Temperatura Interna" },
    15: { arquivo: "1.3mabel", legenda: "Temperatura Externa" },
    16: { arquivo: "1.4mabel", legenda: "Umidade Interna" },
    17: { arquivo: "1.5mabel", legenda: "Umidade Externa" },
    18: { arquivo: "1.6mabel", legenda: "Temperatura do Ninho" },
    19: { arquivo: "1.7mabel", legenda: "Umidade e Temperatura Interna e Externa" },
    20: { arquivo: "2.1mabel", legenda: "Temperatura Interna Média" },
    21: { arquivo: "2.2mabel", legenda: "Temperatura Externa Média" },
    22: { arquivo: "2.3mabel", legenda: "Umidade Interna Média" },
    23: { arquivo: "2.4mabel", legenda: "Umidade Externa Média" },
    24: { arquivo: "2.5mabel", legenda: "Temperatura Máxima do Ninho" },
    25: { arquivo: "2.6mabel", legenda: "Temperatura Mínima do Ninho" },
    26: { arquivo: "2.7mabel", legenda: "Diferença Média Temperatura Interna e Externa" },
    27: { arquivo: "2.8mabel", legenda: "Média Diária Temperatura Interna" },
    28: { arquivo: "2.9mabel", legenda: "Média Diária Umidade Interna" }

};


// SELECT listeners
if (selectPTQA) {
    consultaSelecionada = consultas[1];
    selectPTQA.addEventListener("change", () => {
    consultaSelecionada = consultas[selectPTQA.value];
    });
    pasta = "ptqa";
}

if (selectMabel) {
    consultaSelecionada = consultas[14];
    selectMabel.addEventListener("change", () => {
        consultaSelecionada = consultas[selectMabel.value];
    });
    pasta = "mabel";
}

let graficoAtual = null;


// =============================
// Função principal do gráfico
// =============================
function chamarBackend(event) {
    event.preventDefault();

    const inicio = dataInicial.value;
    const fim = dataFinal.value;

    if (!inicio || !fim) {
        paragrafoErroGrafico.innerText = "Por favor, preencha as duas datas.";
        return;
    }

    if (inicio > fim) {
        paragrafoErroGrafico.innerText = "A data inicial não pode ser maior que a final.";
        return;
    }

    paragrafoErroGrafico.innerText = "";

    const url = `http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/${pasta}/${consultaSelecionada.arquivo}.php?` + `dataInicial=${inicio}&dataFinal=${fim}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            console.log("JSON recebido:", data);

            if (!data || data.length === 0) {
                paragrafoErroGrafico.innerText = "Nenhum dado encontrado.";
                return;
            }

            // Selecionar campo de data/hora baseado em qual select está ativo
            let campoData, campoHora;

            if (selectPTQA) {
                campoData = "dataleitura";
                campoHora = "horaleitura";
            }

            if (selectMabel) {
                campoData = "datainclusao";
                campoHora = "horainclusao";
            }

            const labels = data.map(d => ${d[campoData] ?? ""} ${d[campoHora] ?? ""});

            // Pega colunas de valores
            const campos = Object.keys(data[0]);

            const colunasValidas = campos.filter(c =>
                c !== campoData &&
                c !== campoHora
            );

            const datasets = colunasValidas.map(col => ({
                label: col,
                data: data.map(d => d[col]),
                borderWidth: 2
            }));

            if (graficoAtual) graficoAtual.destroy();

            const ctx = document.getElementById("graficoMabel").getContext("2d");

            graficoAtual = new Chart(ctx, {
                type: "bar",
                data: { labels, datasets },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: consultaSelecionada.legenda,
                            font: { size: 18 }
                        }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        })
        .catch(err => console.error("Erro:", err));
}


// Botão de gerar gráfico
botaoData.addEventListener("click", chamarBackend);