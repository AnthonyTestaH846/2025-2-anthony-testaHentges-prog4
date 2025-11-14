
-- Exibir as umidades externas registradas na colmeia. Campo “he”

SELECT datahora, he
FROM   leituramabel;
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;