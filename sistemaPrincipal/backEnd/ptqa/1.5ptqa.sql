
-- Exibir os registros em que a pressão atmosférica foi menor que 1000 hPa em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
        dataleitura, horaleitura, pressao
FROM
    leituraptqa
WHERE
    pressao < 1000
    AND CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim;
