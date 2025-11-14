
-- Exibir as temperaturas externas registradas na colmeia. Campo “te”

SELECT datahora, te
FROM   leituramabel;
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;