
-- Exibir os registros de ótima qualidade do ar (AQI = 1) em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    *
FROM
    leituraptqa
WHERE
    aqi = 1 -- Ótima qualidade do ar
    AND CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim;
