
-- Listar a média diária da umidade interna em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    datainclusao AS Data,
    AVG(hi) AS Umidade_Media_Diaria
FROM
    leituraptqa
WHERE
    CONCAT(datainclusao, ' ', horainclusao) BETWEEN 'YYYY-MM-DD HH:MM:SS' AND 'YYYY-MM-DD HH:MM:SS'
GROUP BY
    datainclusao
ORDER BY
    datainclusao;
