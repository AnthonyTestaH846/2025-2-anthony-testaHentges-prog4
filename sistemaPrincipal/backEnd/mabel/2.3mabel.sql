
-- Calcular a umidade interna média da colméia em um período específico de tempo. Aplicar filtro, cláusula where

SELECT AVG(hi)
    AS media_te
FROM
    leituramabel
WHERE
    datahora
BETWEEN
    :data_inicio
    AND :data_fim;