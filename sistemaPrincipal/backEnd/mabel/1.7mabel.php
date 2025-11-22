<?php
# Exibir umidade e temperatura, interna e externa, realizadas em um dia específico

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
$dataInicio  = $dataInicial . " 00:00:00";
$dataFim     = $dataFinal   . " 23:59:59";

$sql = "SELECT
    datahora,
    ti,
    te,
    hi,
    he
FROM
    leituramabel;
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;
";

$stmt = $conecta->prepare($sql);
$stmt->execute([
    ':data_inicio' => $dataInicio,
    ':data_fim'    => $dataFim
]);

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
?>
