<?php
#Exibir os registros em que a umidade foi maior do que 70% em um período específico de tempo. Aplicar filtro, cláusula where. Ordenar os registros em ordem decrescente

header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../conecta_mysql.php';

$dataInicial = $_GET['dataInicial'] ?? null;
$dataFinal   = $_GET['dataFinal'] ?? null;
// pega o parametro do filtro de freq (dias)
$freq = $_GET['filtrofreq'] ?? null;

if (!$dataInicial || !$dataFinal) {
    echo json_encode(["erro" => "Datas não enviadas"]);
    exit;
}

$sql = "SELECT dataleitura, horaleitura, ROUND(umidade, 1)
FROM leituraptqa
WHERE umidade > 70 
AND umidade < 100 
AND dataleitura BETWEEN :dataInicial AND :dataFinal
ORDER BY dataleitura ASC, horaleitura ASC
";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'    => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Array final filtrado
    $dadosFiltrados = [];

    // --- LOOP DE SAMPLING ---
    foreach ($resultado as $index => $row) {
        // O operador % (módulo) verifica o resto da divisão.
        // Se o resto for 0, significa que atingimos o intervalo desejado (ex: a cada 10 registros).
        if ($index % $freq == 0) {
            
            // Formata a data apenas para os itens que vão entrar no array final
            if (!empty($row['dataleitura'])) {
                $row['dataleitura'] = date("d/m/Y", strtotime($row['dataleitura']));
            }

            // Adiciona ao novo array
            $dadosFiltrados[] = $row;
        }
    }

echo json_encode($dadosFiltrados);
?>