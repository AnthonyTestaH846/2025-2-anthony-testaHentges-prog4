let graficoAtual = null;

let paragrafoErroGrafico = document.getElementById("errorMsg");
let botaoData = document.getElementById("botaoData");
let dataInicial;
let dataFinal;
let valorOpcao = null;


let endereco = "";
let url = ``;

botaoData.addEventListener("click", caminhoDoArquivo);

function caminhoDoArquivo(){
    event.preventDefault();
    dataInicial = document.getElementById("dataInicial");
    dataFinal = document.getElementById("dataFinal");
    let opcao = document.getElementById("opcao");
    valorOpcao = opcao.value;



    if(valorOpcao == 1){endereco = "http://localhost/sistemaPrincipal/backEnd/ptqa/1.2ptqa.php"; chamarBackend();}
    else if (valorOpcao == 2){endereco = "http://localhost/backEnd/ptqa/1.3ptqa.php"; chamarBackend();}
    else if (valorOpcao == 3){endereco = "http://localhost/backEnd/ptqa/1.4ptqa.php"; chamarBackend();}
    else if (valorOpcao == 4){endereco = "http://localhost/backEnd/ptqa/1.5ptqa.php"; chamarBackend();}
    else if (valorOpcao == 5){endereco = "http://localhost/backEnd/ptqa/1.6ptqa.php"; chamarBackend();}
    else if (valorOpcao == 6){endereco = "http://localhost/backEnd/ptqa/2.1ptqa.php"; chamarBackend();}
    else if (valorOpcao == 7){endereco = "http://localhost/backEnd/ptqa/2.2ptqa.php"; chamarBackend();}
    else if (valorOpcao == 8){endereco = "http://localhost/backEnd/ptqa/2.3ptqa.php"; chamarBackend();}
    else if (valorOpcao == 9){endereco = "http://localhost/backEnd/ptqa/2.4ptqa.php"; chamarBackend();}
    else if (valorOpcao == 10){endereco = "http://localhost/sistemaPrincipal/backEnd/ptqa/2.5ptqa.php"; chamarBackend();}
    else if (valorOpcao == 11){endereco = "http://localhost/sistemaPrincipal/backEnd/ptqa/2.6ptqa.php"; chamarBackend();}
    else if (valorOpcao == 12){endereco = "http://localhost/sistemaPrincipal/backEnd/ptqa/2.7ptqa.php"; chamarBackend();}
    else if (valorOpcao == 13){endereco = "http://localhost/sistemaPrincipal/backEnd/ptqa/2.8ptqa.php"; chamarBackend();}
}



function chamarBackend(event) {
 // Impede o form de recarregar a página

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

    url = endereco + `?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}`;

    console.log("URL chamada:", url);

    criarGrafico();
}
            

function criarGrafico(){
    if (graficoAtual) {graficoAtual.destroy();}

    fetch(url)
        .then(response => {
            console.log("Resposta bruta:", response);
            
            return response.json();
        })
        .then(data => {
            console.log("JSON recebido:", data);
            if(data.length > 0) {

//*****************************************************************************************************
//====================================INÍCIO-DOS-GRÁFICOS==============================================
//*****************************************************************************************************

                if(valorOpcao == 1){ //QA >= 4
                    
                    const agrupado = {}; // Agrupa leituras por dia e calcula média diária

                    data.forEach(item => {
                        if (!agrupado[item.data_leitura]) agrupado[item.data_leitura] = [];
                        agrupado[item.data_leitura].push(item.indice_qualidade_ar);
                    });

                    const labels = Object.keys(agrupado);
                    const qaMenor4 = labels.map(dia => {
                        const valores = agrupado[dia];
                        return valores.reduce((a, b) => a + b, 0) / valores.length;
                    });(item => item.indice_qualidade_ar);

                    const ctx = document.getElementById('graficoPTQA').getContext('2d');
                    // Criando um gradiente bonito para área do gráfico
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.5)');
                    gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

                    // Destruir gráfico antigo (caso clique várias vezes)
                    if (window.graficoAtual) {
                        window.graficoAtual.destroy();
                    }

                    window.graficoAtual = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Qualidade do Ar',
                                data: qaMenor4,
                                backgroundColor: gradient,
                                borderColor: 'rgb(75, 192, 192)',
                                borderWidth: 3,
                                pointRadius: 4,
                                pointBackgroundColor: 'white',
                                pointBorderColor: 'rgb(75, 192, 192)',
                                pointHoverRadius: 6,
                                tension: 0.35
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    labels: {
                                        font: { size: 14, family: "Arial" },
                                        color: '#333'
                                    }
                                },
                                tooltip: {
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    titleFont: { size: 14, weight: 'bold' },
                                    bodyFont: { size: 13 }
                                }
                            },
                            scales: {
                                x: {
                                    ticks: { color: '#333', font: { size: 12 } },
                                    grid: { color: 'rgba(0,0,0,0.05)' }
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: { color: '#333', font: { size: 12 } },
                                    grid: { color: 'rgba(0,0,0,0.05)' }
                                }
                            }
                        }
                    });

                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 2){

                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 3){

                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 4){
                    
                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 5){
                    
                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 6){
                    
                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 7){
                    
                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 8){
                    
                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 9){
                    
                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 10){
                    
                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 11){
                    
                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 12){
                    
                }

//*****************************************************************************************************
//====================================SEPARAÇÃO-DE-GRÁFICOS============================================
//*****************************************************************************************************

                else if(valorOpcao == 13){
                    
                }

//*****************************************************************************************************
//====================================FIM-DOS-GRÁFICOS=================================================
//*****************************************************************************************************

            }
            else{
                console.log("Nenhum dado encontrado.");
                paragrafoErroGrafico.innerText = "Nenhum dado encontrado."
            }
        }).catch(err => console.error("Erro no fetch:", err));
}
