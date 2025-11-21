<?php
#Exibir data, hora e temperatura em um período específico de tempo. Aplicar filtro, cláusula where. Ordenar os registros por data e hora em ordem crescente, ou seja, as temperaturas registradas nas primeiras horas do dia devem aparecer no topo

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
    DATE_FORMAT(STR_TO_DATE(dataleitura, '%Y-%m-%d'), '%d/%m/%Y') AS data_leitura,
    horaleitura AS hora_leitura,
    ROUND(temperatura, 1)
FROM
    leituraptqa
WHERE
    CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim
ORDER BY
    dataleitura ASC, horaleitura ASC;";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'   => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);
?>