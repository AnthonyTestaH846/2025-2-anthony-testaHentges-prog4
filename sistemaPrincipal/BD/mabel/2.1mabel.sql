
-- Calcular a temperatura interna média da colméia em um período específico de tempo. Aplicar filtro, cláusula where

SELECT AVG(ti)
    AS media_ti
FROM
    leituramabel
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;