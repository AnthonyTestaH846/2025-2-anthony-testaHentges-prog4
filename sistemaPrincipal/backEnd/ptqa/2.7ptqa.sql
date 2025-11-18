
-- Exibir o nível médio de gases voláteis em um período específico de tempo agrupado pelo índice de qualidade do ar. Aplicar filtro, cláusula where

SELECT
    aqi AS Indice_Qualidade_Ar,
    AVG(tvoc) AS Media_Gases_Volateis
FROM
    leituraptqa
WHERE
    CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim
GROUP BY
    aqi
ORDER BY
    aqi;
