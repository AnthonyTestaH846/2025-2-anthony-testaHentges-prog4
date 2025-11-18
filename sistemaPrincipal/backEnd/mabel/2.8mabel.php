<?php

# Listar a média diária da temperatura interna em um período específico de tempo. Aplicar filtro, cláusula where

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

$sql = "
SELECT DATE(datahora)
    AS datainclusao, AVG(ti)
    AS media_diaria_ti 
FROM 
    leituramabel
WHERE 
    datahora
BETWEEN
    :data_inicio
    AND :data_fim
GROUP BY
    datainclusao
ORDER BY
    datainclusao ASC;
";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'   => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);
?>
