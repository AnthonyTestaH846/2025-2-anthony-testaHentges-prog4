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

// transformar para formato DATETIME
$dataInicial  = $dataInicial . " 00:00:00";
$dataFinal     = $dataFinal   . " 23:59:59";

$sql = "SELECT
    aqi AS indice_qualidade_ar,
    ROUND(AVG(tvoc), 1) AS media_gases_volateis
FROM
    leituraptqa
WHERE
    aqi > 0 AND aqi < 100
    CONCAT(dataleitura, ' ', horaleitura) BETWEEN :dataInicial AND :dataFinal
GROUP BY
    aqi
ORDER BY
    aqi;
";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'    => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
?>
