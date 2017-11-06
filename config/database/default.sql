-- This script only run ONE time when you setting up your local.

CREATE TABLE IF NOT EXISTS db_version (
	ID INT NOT NULL AUTO_INCREMENT,
    Version VARCHAR(36) NOT NULL,
    LastUpdatedDate Datetime NOT NULL,
    LastUpdatedBy VARCHAR(36) NOT NULL,
    PRIMARY KEY (ID)
)engine=InnoDB;

INSERT INTO db_version (Version, LastUpdatedDate, LastUpdatedBy) 
VALUES ("0.0.1", NOW(), "SYSTEM");
