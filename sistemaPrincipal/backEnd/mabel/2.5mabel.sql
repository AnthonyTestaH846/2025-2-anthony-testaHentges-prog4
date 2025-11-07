
-- Obter o valor máximo da temperatura do ninho em um período específico de tempo. Aplicar filtro, cláusula where

SELECT MAX(ninho)
    AS max_ninho
FROM
    leituramabel
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;