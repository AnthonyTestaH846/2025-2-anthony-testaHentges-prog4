
-- Exibir a máxima concentração de CO₂ registrada em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    MAX(eco2) AS Maxima_Concentracao_CO2
FROM
    leituraptqa
WHERE
    CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim;