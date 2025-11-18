<?php
$username = 'root';
$password = '';
$dbname   = 'mabel_ptqa_anthony_eloiza_mateus';
$host     = 'localhost';
try {
 $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
 $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
} catch(PDOException $e) {
    die('A conexão com o banco de dados falhou conectaBanco: ' . $e->getMessage());
}
?>