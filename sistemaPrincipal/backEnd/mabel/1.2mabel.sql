
-- Exibir as temperaturas internas registradas na colmeia. Campo “ti”

SELECT datahora, ti
FROM   leituramabel;
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;