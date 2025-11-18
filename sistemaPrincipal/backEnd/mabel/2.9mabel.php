
<?php

# Listar a média diária da umidade interna em um período específico de tempo. Aplicar filtro, cláusula where

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

$sql = "
SELECT
    datainclusao AS Data,
    AVG(hi) AS Umidade_Media_Diaria
FROM
    leituramabel
WHERE
    CAST(CONCAT(datainclusao, ' ', horainclusao) AS DATETIME) BETWEEN :data_inicio AND :data_fim
GROUP BY
    datainclusao
ORDER BY
    datainclusao;
";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'   => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);
?>

