
-- Calcular a umidade média por dia em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    dataleitura AS Data,
    AVG(umidade) AS Umidade_Media_Diaria
FROM
    leituraptqa
WHERE
    CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim
GROUP BY
    dataleitura
ORDER BY
    dataleitura;
