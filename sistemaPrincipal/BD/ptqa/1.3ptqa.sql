
-- Exibir os registros em que a umidade foi maior do que 70% em um período específico de tempo. Aplicar filtro, cláusula where. Ordenar os registros em ordem decrescente

SELECT
    *
FROM
    leituraptqa
WHERE
    umidade > 70
    AND CONCAT(dataleitura, ' ', horaleitura) BETWEEN 'YYYY-MM-DD HH:MM:SS' AND 'YYYY-MM-DD HH:MM:SS'
ORDER BY
    umidade DESC;