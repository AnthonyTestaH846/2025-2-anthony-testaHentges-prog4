let botaoData = document.getElementById("botaoData");
let dataInicial = document.getElementById("dataInicial");
let dataFinal = document.getElementById("dataFinal");
let paragrafoErroGrafico = document.getElementById("pErro");

let opcao = document.getElementsByClassName("opcao");
let valorOpcao = opaco.value;
let endereco = ""


function caminhoDoArquivo(){
    if(valorOpcao == 1){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/1.2ptqa.php"; return;}
    else if (valorOpcao == 2){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/1.3ptqa.php"; return;}
    else if (valorOpcao == 3){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/1.4ptqa.php"; return;}
    else if (valorOpcao == 4){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/1.5ptqa.php"; return;}
    else if (valorOpcao == 5){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/1.6ptqa.php"; return;}
    else if (valorOpcao == 6){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/2.1ptqa.php"; return;}
    else if (valorOpcao == 7){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/2.2ptqa.php"; return;}
    else if (valorOpcao == 8){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/2.3ptqa.php"; return;}
    else if (valorOpcao == 9){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/2.4ptqa.php"; return;}
    else if (valorOpcao == 10){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/2.5ptqa.php"; return;}
    else if (valorOpcao == 11){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/2.6ptqa.php"; return;}
    else if (valorOpcao == 12){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/2.7ptqa.php"; return;}
    else if (valorOpcao == 13){endereco = "http://localhost/2025-2-anthony-testaHentges-Prog4/sistemaPrincipal/backEnd/ptqa/2.8ptqa.php"; return;}
}



function chamarBackend(event) {
    event.preventDefault(); // Impede o form de recarregar a página

    let valorDataInicial = dataInicial.value;
    let valorDataFinal = dataFinal.value;

    // --- VALIDAÇÕES ---
    if (!valorDataInicial || !valorDataFinal) {
        paragrafoErroGrafico.innerText = "Por favor, preencha as duas datas.";
        return;
    }

    if (valorDataInicial > valorDataFinal) {
        paragrafoErroGrafico.innerText = "A data inicial não pode ser maior que a data final.";
        return;
    }

    // limpa erro se estiver tudo OK
    paragrafoErroGrafico.innerText = "";

    let url = endereco+`?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}`;

    console.log("URL chamada:", url);

    criarGrafico();
}
            

function criarGrafico(){
    fetch(url)
        .then(response => {
            console.log("Resposta bruta:", response);
            return response.json();
        })
        .then(data => {
            console.log("JSON recebido:", data);
            if(data.length > 0) {
                if(valorOpcao == 1){
                    const labels = data.map(item => item.data_leitura);
                    const qaMenor4 = data.map(item => item.indice_qualidade_ar);

                    const ctx = document.getElementById('graficoPTQA').getContext('2d');
                    const myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Qualidade do AR',
                                data: qaMenor4,
                                backgroundColor: 'rgb(132,136,133,1)',
                                borderColor: 'rgb(75,192,192)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                }
            }
            else{
                console.log("Nenhum dado encontrado.");
                paragrafoErroGrafico.innerText = "Nenhum dado encontrado."
            }
        })
}
botaoData.addEventListener("click", chamarBackend);