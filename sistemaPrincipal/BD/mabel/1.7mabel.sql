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