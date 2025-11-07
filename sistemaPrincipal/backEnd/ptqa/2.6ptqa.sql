
-- Exibir a temperatura máxima, mínima e média em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    MAX(temperatura) AS Temperatura_Maxima,
    MIN(temperatura) AS Temperatura_Minima,
    AVG(temperatura) AS Temperatura_Media
FROM
    leituraptqa
WHERE
    CONCAT(dataleitura, ' ', horaleitura) BETWEEN 'YYYY-MM-DD HH:MM:SS' AND 'YYYY-MM-DD HH:MM:SS';
