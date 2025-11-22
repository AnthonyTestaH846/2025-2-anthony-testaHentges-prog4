<?php
#Exibir os registros de baixa qualidade do ar (AQI ≥ 4) em um período específico de tempo. Aplicar filtro, cláusula where

header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../conecta_mysql.php';

$dataInicial = $_GET['dataInicial'] ?? null;
$dataFinal   = $_GET['dataFinal'] ?? null;

if (!$dataInicial || !$dataFinal) {
    echo json_encode(["erro" => "Datas não enviadas"]);
    exit;
}

// transformar para formato DATETIME
$dataInicio  = $dataInicial . " 00:00:00";
$dataFim     = $dataFinal   . " 23:59:59";

$sql = "SELECT
    DATE_FORMAT(STR_TO_DATE(dataleitura, '%Y-%m-%d'), '%d/%m/%Y') AS data_leitura,
    horaleitura AS hora_leitura, 
    aqi AS indice_qualidade_ar
FROM
    leituraptqa
WHERE
    aqi >= 4
    AND CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim
ORDER BY dataleitura, horaleitura;
";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':data_inicio' => $dataInicio,
    ':data_fim'    => $dataFim
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
?>