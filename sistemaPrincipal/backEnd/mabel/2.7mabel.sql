
-- Calcular a diferença média entre temperatura interna e externa em um período específico de tempo. Aplicar filtro, cláusula where

SELECT AVG(ti - te)
    AS media_diferenca
FROM
    leituramabel
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;