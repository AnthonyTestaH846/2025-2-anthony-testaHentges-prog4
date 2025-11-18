
-- Exibir os registros onde os gases voláteis estavam acima de 200 ppb em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    *
FROM
    leituraptqa
WHERE
    tvoc > 200
    AND CONCAT(dataleitura, ' ', horaleitura) BETWEEN :data_inicio AND :data_fim;
