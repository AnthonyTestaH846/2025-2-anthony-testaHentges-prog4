
-- Listar a média diária da temperatura interna em um período específico de tempo. Aplicar filtro, cláusula where

SELECT DATE(datahora)
    AS datainclusao, AVG(ti)
    AS media_diaria_ti 
FROM 
    leituramabel
WHERE 
    datahora
BETWEEN
    :data_inicio
    AND :data_fim
GROUP BY
    datainclusao
ORDER BY
    datainclusao ASC;