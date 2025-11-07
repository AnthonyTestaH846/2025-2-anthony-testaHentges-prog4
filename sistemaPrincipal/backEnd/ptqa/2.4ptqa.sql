
-- Exibir a mínima pressão registrada por dia em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    dataleitura AS Data,
    MIN(pressao) AS Minima_Pressao_Diaria
FROM
    leituraptqa
WHERE
    CONCAT(dataleitura, ' ', horaleitura) BETWEEN 'YYYY-MM-DD HH:MM:SS' AND 'YYYY-MM-DD HH:MM:SS'
GROUP BY
    dataleitura
ORDER BY
    dataleitura;