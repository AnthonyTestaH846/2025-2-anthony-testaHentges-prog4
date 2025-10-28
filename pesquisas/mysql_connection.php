<?php

class MySQL_Connection
{
    private $host = 'localhost';
    private $db = 'mabel_ptqa_anthony_eloiza_mateus';
    private $user = 'root';
    private $password = '';
    private $charset = 'utf8mb4';

    public function connect()
    {
        try {
            $dsn = "mysql:host=$this->host; dbname=$this->db; charset=$this->charset";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            return new PDO($dsn, $this->user, $this->password, $options);
        } catch (PDOException $e) {
            die('A conexão com o banco de dados falhou: ' . $e->getMessage());
        }
    }
}

/*
Para usar a classe de conexão nos demais arquivos do projeto, obviamente deve se 
chamar a classe apenas nos locais onde precisa-se conexão com o banco de dados:

1º - Vincular o arquivo com a definição/implementação da classe de conexão no
arquivo que precisa utilizar essa funcionalidade: "caminhoRelativo/mysql_connection.php".

2º - No arquivo de destino, que usará a classe "MySQL_Connection", declarar e instanciar um objeto
da classe para poder ter acesso as funcionalidades da classe: $dbconnection = new MySQL_Connection();

3º - Chamar o método de criação do banco de dados e atribuir a nova variável o retorno do método:
$currentConnection = dbCo

*/

?>
