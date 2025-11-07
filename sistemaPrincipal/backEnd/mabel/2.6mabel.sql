
-- Obter o valor mínimo da temperatura do ninho em um período específico de tempo. Aplicar filtro, cláusula where

SELECT MIN(ninho)
    AS min_ninho
FROM
    leituramabel
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;