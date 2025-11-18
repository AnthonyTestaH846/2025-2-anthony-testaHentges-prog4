
-- Exibir os registros em que a umidade foi maior do que 70% em um período específico de tempo. Aplicar filtro, cláusula where. Ordenar os registros em ordem decrescente

SELECT
    dataleitura, horaleitura, umidade
FROM
    leituraptqa
WHERE
    umidade > 70
    AND CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim
ORDER BY
    umidade DESC;