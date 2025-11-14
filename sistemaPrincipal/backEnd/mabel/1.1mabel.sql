
-- Exibir a data e hora em que os registros foram gravados na tabela. Campo “datahora”

SELECT datahora
FROM   leituramabel;
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;