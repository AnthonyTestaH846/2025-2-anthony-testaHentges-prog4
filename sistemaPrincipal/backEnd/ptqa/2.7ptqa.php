<?php
#Exibir o nível médio de gases voláteis em um período específico de tempo agrupado pelo índice de qualidade do ar. Aplicar filtro, cláusula where

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
    aqi AS indice_qualidade_ar,
    ROUND(AVG(tvoc), 1) AS media_gases_volateis
FROM
    leituraptqa
WHERE
    CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim
GROUP BY
    aqi
ORDER BY
    aqi;
";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'   => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);
?>
