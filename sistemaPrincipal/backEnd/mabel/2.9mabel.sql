
-- Listar a média diária da umidade interna em um período específico de tempo. Aplicar filtro, cláusula where

SELECT
    datainclusao AS Data,
    AVG(hi) AS Umidade_Media_Diaria
FROM
    leituramabel
WHERE
    CAST(CONCAT(datainclusao, ' ', horainclusao) AS DATETIME) BETWEEN :data_inicio AND :data_fim
GROUP BY
    datainclusao
ORDER BY
    datainclusao;
