
-- Exibir a temperatura do ninho. Campo “ninho”

SELECT datahora, ninho
FROM   leituramabel;
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;
