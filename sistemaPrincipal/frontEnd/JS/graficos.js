// Inputs 
let botaoData = document.getElementById("botaoData");
let dataInicial = null;
let dataFinal = null;
let paragrafoErroGrafico = document.getElementById("pErro");
let selectMabel = document.getElementById("selectMabel");
let selectPTQA = document.getElementById("selectPTQA");
let filtrofreq = document.getElementById("filtrofreq");
let consultaSelecionada = null;
let pasta = "";

// CONSULTAS (legenda preservada)
const consultas = {
    1:  { arquivo: "1.2ptqa", legenda: "Baixa AQI", tipoGrafico: "line" },
    2:  { arquivo: "1.3ptqa", legenda: "Umidade>70%", tipoGrafico: "bar" },
    3:  { arquivo: "1.4ptqa", legenda: "CO2 >1000", tipoGrafico: "bar" },
    4:  { arquivo: "1.5ptqa", legenda: "Pressão < 1000", tipoGrafico: "bar" },
    5:  { arquivo: "1.6ptqa", legenda: "Gases acima de 200", tipoGrafico: "bar" },
    6:  { arquivo: "2.1ptqa", legenda: "Temp Media", tipoGrafico: "line" },
    7:  { arquivo: "2.2ptqa", legenda: "Umidade media", tipoGrafico: "line" },
    8:  { arquivo: "2.3ptqa", legenda: "Máxima concentração CO2", tipoGrafico: "line" },
    9:  { arquivo: "2.4ptqa", legenda: "Mín pressão", tipoGrafico: "line" },
    10: { arquivo: "2.5ptqa", legenda: "Otima AQI", tipoGrafico: "line" },
    11: { arquivo: "2.6ptqa", legenda: "Temp Min, med, max", tipoGrafico: "line" },
    12: { arquivo: "2.7ptqa", legenda: "Media Gases", tipoGrafico: "line" },
    13: { arquivo: "2.8ptqa", legenda: "maior concentração co2", tipoGrafico: "line" },

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

    dataInicial = document.getElementById("dataInicial");
    dataFinal = document.getElementById("dataFinal");

    const inicio = dataInicial.value;
    const fim = dataFinal.value;
    // pegar valor do filtro
    const freq = filtrofreq.value;

    if (!inicio || !fim) {
        paragrafoErroGrafico.innerText = "Por favor, preencha as duas datas.";
        return;
    }

    if (inicio > fim) {
        paragrafoErroGrafico.innerText = "A data inicial não pode ser maior que a final.";
        return;
    }

    // validar filtro > 0
    if (freq <= 0) {
        paragrafoErroGrafico.innerText = "O filtro de dias deve ser maior que 0.";
        return;
    }


    paragrafoErroGrafico.innerText = "";

    const url = `http://localhost/sistemaPrincipal/backEnd/${pasta}/${consultaSelecionada.arquivo}.php?` + `dataInicial=${inicio}&dataFinal=${fim}`
        + `&filtrofreq=${freq}`; // adicionar filtro na url

    console.log("URL chamada:", url);

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

            const labels = data.map(d => `${d[campoData] ?? ""} ${d[campoHora] ?? ""}`);

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

            const ctx = document.getElementById("graficoGerado").getContext("2d");

            graficoAtual = new Chart(ctx, {
                type: consultaSelecionada.tipoGrafico,
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