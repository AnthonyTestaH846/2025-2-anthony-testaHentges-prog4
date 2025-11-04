<?php
include 'conectabanco.php';

$sql = "SELECT datahora FROM leituramabel";
$stmt = $pdo->query($sql);
$registros = $stmt->fetchAll();

echo "<h2>Registros de Data e Hora:</h2>";
echo "<ul>";
foreach ($registros as $registro) {
    echo "<li>" . htmlspecialchars($registro['datahora']) . "</li>";
}
echo "</ul>";

$nome = "Novo Item";
$valor = 123.45;

$sql_insert = "INSERT INTO outra_tabela (nome, preco, datahora) VALUES (:nome_param, :valor_param, NOW())";

$stmt = $pdo->prepare($sql_insert);
$stmt->execute([
    ':nome_param' => $nome,
    ':valor_param' => $valor]);

echo "Novo registro inserido com sucesso!";

?>