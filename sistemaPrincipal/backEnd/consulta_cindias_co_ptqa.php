<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'conecta_mysql.php';

$dataInicial = $_GET['dataInicial'] ?? null;
$dataFinal   = $_GET['dataFinal'] ?? null;

if (!$dataInicial || !$dataFinal) {
    echo json_encode(["erro" => "Datas não enviadas"]);
    exit;
}

$sql = "SELECT dataleitura, ROUND(AVG(eco2),2) AS media_co2
        FROM leituraptqa
        WHERE dataleitura BETWEEN :dataInicial AND :dataFinal
        GROUP BY dataleitura
        ORDER BY dataleitura ASC";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'   => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);
