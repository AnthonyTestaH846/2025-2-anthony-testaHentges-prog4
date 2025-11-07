
-- Listar a média diária da umidade interna em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    dataleitura AS Data,
    AVG(umidade) AS Umidade_Media_Diaria
FROM
    leituraptqa
WHERE
    CONCAT(dataleitura, ' ', horaleitura) BETWEEN 'YYYY-MM-DD HH:MM:SS' AND 'YYYY-MM-DD HH:MM:SS'
GROUP BY
    dataleitura
ORDER BY
    dataleitura;
