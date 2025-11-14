
-- Exibir as umidades internas registradas na colmeia. Campo “hi”

SELECT datahora, hi
FROM   leituramabel;
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;