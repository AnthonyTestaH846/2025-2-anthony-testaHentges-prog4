
-- Exibir data, hora e temperatura em um período específico de tempo. Aplicar filtro, cláusula where. Ordenar os registros por data e hora em ordem crescente, ou seja, as temperaturas registradas nas primeiras horas do dia devem aparecer no topo

SELECT
    dataleitura AS Data,
    horaleitura AS Hora,
    temperatura
FROM
    leituraptqa
WHERE
    CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim
ORDER BY
    dataleitura ASC, horaleitura ASC;
