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

    14: { arquivo: "consulta_media_he_mabel", legenda: "Umidade Externa" },
    15: { arquivo: "consulta_media_hi_mabel", legenda: "Umidade Interna" },
    16: { arquivo: "consulta_mabel", legenda: "Média CO₂" },
    17: { arquivo: "consulta_media_he_mabel", legenda: "Umidade Externa Média" },
    18: { arquivo: "consulta_media_hi_mabel", legenda: "Umidade Interna Média" },
    19: { arquivo: "consulta_media_te_mabel", legenda: "Temperatura Externa Média" },
    20: { arquivo: "consulta_media_ti_mabel", legenda: "Temperatura Interna Média" },
    21: { arquivo: "consulta_media_ti_mabel", legenda: "Temperatura Interna Média" },
    22: { arquivo: "consulta_ninho_mabel", legenda: "Ninhos" },
    23: { arquivo: "consulta_ninho_maior_mabel", legenda: "Ninho Maior" },
    24: { arquivo: "consulta_te_mabel", legenda: "Temperatura Externa" },
    25: { arquivo: "consulta_ti_te_diferenca_ptqa", legenda: "Diferença TI - TE" }
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