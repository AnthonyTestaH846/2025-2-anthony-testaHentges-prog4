<?php
header('Content-Type: application/json');

require_once 'conecta_banco.php'; 

$response = [
    'error' => null,
    'resumo_periodo' => [], 
    'leituras_detalhadas' => [], 
    'medias_diarias' => [],
    'leituras_hoje' => [] 
];

// Recebe os dados do POST
if (!isset($_POST['data_inicio']) || !isset($_POST['data_fim'])) {
    http_response_code(400); 
    $response['error'] = 'Parâmetros de data ausentes.';
    echo json_encode($response);
    exit;
}

// Formata as datas para cobrir o dia inteiro
$data_inicio = $_POST['data_inicio'] . ' 00:00:00';
$data_fim = $_POST['data_fim'] . ' 23:59:59';

try {

    $sqls_resumo = [
        'media_ti' => "SELECT AVG(ti) AS valor FROM leituramabel WHERE datahora BETWEEN :data_inicio AND :data_fim;",
        'media_te' => "SELECT AVG(te) AS valor FROM leituramabel WHERE datahora BETWEEN :data_inicio AND :data_fim;",
        'media_hi' => "SELECT AVG(hi) AS valor FROM leituramabel WHERE datahora BETWEEN :data_inicio AND :data_fim;",
        'media_he' => "SELECT AVG(he) AS valor FROM leituramabel WHERE datahora BETWEEN :data_inicio AND :data_fim;",
        'max_ninho' => "SELECT MAX(ninho) AS valor FROM leituramabel WHERE datahora BETWEEN :data_inicio AND :data_fim;",
        'min_ninho' => "SELECT MIN(ninho) AS valor FROM leituramabel WHERE datahora BETWEEN :data_inicio AND :data_fim;",
        'media_diferenca_ti_te' => "SELECT AVG(ti - te) AS valor FROM leituramabel WHERE datahora BETWEEN :data_inicio AND :data_fim;",
    ];

    foreach ($sqls_resumo as $alias => $sql) {
        $stmt = $conn->prepare($sql);
        $stmt->execute([':data_inicio' => $data_inicio, ':data_fim' => $data_fim]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $response['resumo_periodo'][$alias] = $result['valor'];
    }


    $sql_media_diaria_ti = "
        SELECT DATE(datahora) AS data, AVG(ti) AS media_ti 
        FROM leituramabel
        WHERE datahora BETWEEN :data_inicio AND :data_fim
        GROUP BY data ORDER BY data ASC;
    ";
    $stmt_media_diaria_ti = $conn->prepare($sql_media_diaria_ti);
    $stmt_media_diaria_ti->execute([':data_inicio' => $data_inicio, ':data_fim' => $data_fim]);
    $response['medias_diarias']['ti'] = $stmt_media_diaria_ti->fetchAll(PDO::FETCH_ASSOC);

    $sql_media_diaria_hi = "
        SELECT DATE(datahora) AS data, AVG(hi) AS media_hi 
        FROM leituramabel
        WHERE datahora BETWEEN :data_inicio AND :data_fim
        GROUP BY data ORDER BY data ASC;
    ";
    $stmt_media_diaria_hi = $conn->prepare($sql_media_diaria_hi);
    $stmt_media_diaria_hi->execute([':data_inicio' => $data_inicio, ':data_fim' => $data_fim]);
    $response['medias_diarias']['hi'] = $stmt_media_diaria_hi->fetchAll(PDO::FETCH_ASSOC);


    $sqls_detalhe = [
        'datahora_mabel' => 'datahora',
        'ti_detalhe' => 'datahora, ti',
        'te_detalhe' => 'datahora, te',
        'hi_detalhe' => 'datahora, hi',
        'he_detalhe' => 'datahora, he',
        'ninho_detalhe' => 'datahora, ninho',
    ];

    foreach ($sqls_detalhe as $alias => $campos) {
        $sql = "SELECT $campos FROM leituramabel WHERE datahora BETWEEN :data_inicio AND :data_fim ORDER BY datahora DESC;";
        $stmt = $conn->prepare($sql);
        $stmt->execute([':data_inicio' => $data_inicio, ':data_fim' => $data_fim]);
        $response['leituras_detalhadas'][$alias] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $sql_curdate = "
        SELECT datahora, ti, te, hi, he
        FROM leituramabel
        WHERE DATE(datahora) = CURDATE()
        ORDER BY datahora ASC;
    ";
    $stmt_curdate = $conn->prepare($sql_curdate);
    $stmt_curdate->execute();
    $response['leituras_hoje'] = $stmt_curdate->fetchAll(PDO::FETCH_ASSOC);


} catch (\PDOException $e) {
    error_log("Erro na Consulta SQL: " . $e->getMessage());
    http_response_code(500);
    $response['error'] = 'Erro ao executar as consultas no banco de dados. Detalhes: ' . $e->getMessage();
}

echo json_encode($response);

$conn = null;
?>