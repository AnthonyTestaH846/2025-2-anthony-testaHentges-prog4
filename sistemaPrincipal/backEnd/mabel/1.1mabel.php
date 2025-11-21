<?php

#  Exibir a data e hora em que os registros foram gravados na tabela. Campo “datahora”

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
SELECT DATE_FORMAT(STR_TO_DATE(datahora, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y %H:%i:%s') AS data_hora,
DATE_FORMAT(STR_TO_DATE(dataInclusao, '%Y-%m-%d'), '%d/%m/%Y') AS data_inclusao
FROM leituramabel;
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':dataInicial' => $dataInicial,
    ':dataFinal'   => $dataFinal
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);
?>