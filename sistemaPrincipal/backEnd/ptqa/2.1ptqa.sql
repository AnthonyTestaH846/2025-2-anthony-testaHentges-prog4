
-- Calcular a temperatura média registrada em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    AVG(temperatura) AS Temperatura_Media
FROM
    leituraptqa
WHERE
    CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim;