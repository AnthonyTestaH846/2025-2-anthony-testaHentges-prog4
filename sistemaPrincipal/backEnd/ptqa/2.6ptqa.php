<?php
#Exibir a temperatura máxima, mínima e média em um período específico de tempo. Aplicar filtro, cláusula where

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

$sql = "SELECT
    ROUND(MAX(temperatura), 1),
    ROUND(MIN(temperatura), 1),
    ROUND(AVG(temperatura), 1)
FROM
    leituraptqa
WHERE
    dataleitura BETWEEN :dataInicial AND :dataFinal;
";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'    => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
?>
