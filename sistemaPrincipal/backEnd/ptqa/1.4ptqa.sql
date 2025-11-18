
-- Exibir os registros em que o nível de CO₂ ultrapassou 1000 ppm em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    *
FROM
    leituraptqa
WHERE
    eco2 > 1000
    AND CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim;