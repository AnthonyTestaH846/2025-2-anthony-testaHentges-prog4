
-- Calcular a temperatura externa média da colméia em um período específico de tempo. Aplicar filtro, cláusula where

SELECT AVG(te)
    AS media_te
FROM
    leituramabel
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;