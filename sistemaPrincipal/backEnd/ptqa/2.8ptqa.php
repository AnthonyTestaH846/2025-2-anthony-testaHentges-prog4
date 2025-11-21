<?php
#Exibir, dentro de um certo mês específico, os 5 dias com maior média de concentração de gás carbônico (CO₂). Aplicar filtro, cláusula where

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

$sql = "SELECT
    dataleitura AS data_leitura,
    ROUND(AVG(eco2), 1) AS media_CO2_PPM
FROM
    leituraptqa
WHERE
    dataleitura >= DATE_FORMAT(:ano_mes, '%Y-%m-01')
    
    AND dataleitura <= LAST_DAY(DATE_FORMAT(:ano_mes, '%Y-%m-01'))
GROUP BY
    dataleitura
ORDER BY
    media_CO2_PPM DESC
LIMIT 5;
";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'   => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);
?>
