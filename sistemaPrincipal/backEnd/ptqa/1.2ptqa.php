<?php
#Exibir os registros de baixa qualidade do ar (AQI <= 4) em um período específico de tempo. Aplicar filtro, cláusula where

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
$dataInicial  = $dataInicial . " 00:00:00";
$dataFinal     = $dataFinal   . " 23:59:59";

$sql = "SELECT dataleitura, horaleitura, aqi
FROM leituraptqa
WHERE aqi <= 4
AND dataleitura BETWEEN :dataInicial AND :dataFinal
ORDER BY dataleitura, horaleitura;";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'    => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($resultado as &$row) {
    if (!empty($row['dataleitura'])) {
        $row['dataleitura'] = date("d/m/Y", strtotime($row['dataleitura']));
    }
}


echo json_encode($resultado, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
?>