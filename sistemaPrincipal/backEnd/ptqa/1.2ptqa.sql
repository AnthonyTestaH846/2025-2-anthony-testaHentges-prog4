
-- Exibir os registros de baixa qualidade do ar (AQI ≥ 4) em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    dataleitura, horaleitura, aqi
FROM
    leituraptqa
WHERE
    aqi >= 4
    AND CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim;