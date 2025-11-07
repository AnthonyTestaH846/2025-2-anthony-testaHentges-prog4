
-- Exibir umidade e temperatura, interna e externa, realizadas em um dia específico

SELECT
    datahora,
    ti,
    te,
    hi,
    he
FROM
    leituramabel
WHERE
    DATE(datahora) = CURDATE()
ORDER BY
    datahora ASC;