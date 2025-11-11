
-- Exibir, dentro de um certo mês específico, os 5 dias com maior média de concentração de gás carbônico (CO₂). Aplicar filtro, cláusula where

SELECT
    dataleitura AS Dia,
    AVG(eco2) AS Media_CO2_Diaria
FROM
    leituraptqa
WHERE
    STRFTIME('%Y-%m', dataleitura) = 'YYYY-MM' -- Filtragem pelo mês, ajuste a função conforme o SGBD
GROUP BY
    Dia
ORDER BY
    Media_CO2_Diaria DESC
LIMIT 5;
