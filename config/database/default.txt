-- This script only run ONE time when you set up your local db. 

CREATE TABLE IF NOT EXISTS db_version (
	ID INT NOT NULL AUTO_INCREMENT,
    Version VARCHAR(36) NOT NULL,
    LastUpdatedDate Datetime NOT NULL,
    LastUpdatedBy VARCHAR(36) NOT NULL,
    PRIMARY KEY (ID)
)engine=InnoDB;

DROP PROCEDURE IF EXISTS shoppingu_procedure;
DELIMITER $$
CREATE PROCEDURE shoppingu_procedure()
BEGIN
	IF NOT EXISTS (SELECT Version FROM db_version WHERE Version = "0.0.1") THEN
		INSERT INTO db_version (Version, LastUpdatedDate, LastUpdatedBy) VALUES ("0.0.1", NOW(), "SYSTEM");
    END IF;
END$$
DELIMITER ;

CALL shoppingu_procedure();
