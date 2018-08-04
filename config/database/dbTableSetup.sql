-- Certong 6/11/2017 
-- Create table script.
CREATE TABLE IF NOT EXISTS t_country (
	CountryID VARCHAR(36) NOT NULL,
    CountryCode CHAR(3) NOT NULL,
    CountryName VARCHAR(45) NOT NULL,
    PRIMARY KEY (CountryID)
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS t_currency (
	CurrencyID VARCHAR(36) NOT NULL,
    CurrencyCode CHAR(5) NOT NULL,
    CurrencyName VARCHAR(45) NOT NULL,
    PRIMARY KEY (CurrencyID)
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS t_product_cat (
	ProductCatID VARCHAR(36) NOT NULL,
    ProductCatDesc VARCHAR(500) NOT NULL,
    IsActive INT(1) NOT NULL,
    Remarks VARCHAR(500) NULL,
    CreatedDate Datetime NOT NULL,
    CreatedBy VARCHAR(36) NOT NULL,
	LastUpdatedDate Datetime NOT NULL,
    LastUpdatedBy VARCHAR(36) NOT NULL,
    PRIMARY KEY (ProductCatID)
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS t_profile (
	ProfileID VARCHAR(36) NOT NULL,
    FirstName VARCHAR(45) NOT NULL,
    LastName VARCHAR(45) NOT NULL,
    FullName VARCHAR(45) NOT NULL,
    Address VARCHAR(500) NULL,
    Gender INT(11) NOT NULL,
    DOB DATETIME,
    Remarks VARCHAR(500) NULL,
    CreatedDate Datetime NOT NULL,
    CreatedBy VARCHAR(36) NOT NULL,
	LastUpdatedDate Datetime NOT NULL,
    LastUpdatedBy VARCHAR(36) NOT NULL,
    PRIMARY KEY (ProfileID)
)engine=InnoDB;


CREATE TABLE IF NOT EXISTS t_profile_document (
	ProfileDocumentID VARCHAR(36) NOT NULL,
    ProfileID VARCHAR(45) NOT NULL,
    DocumentName VARCHAR(500) NOT NULL,
    DocumentType CHAR(20) NOT NULL,
    DocumentPath VARCHAR(500) NOT NULL,
    Remarks VARCHAR(500) NULL,
    CreatedDate Datetime NOT NULL,
    CreatedBy VARCHAR(36) NOT NULL,
	LastUpdatedDate Datetime NOT NULL,
    LastUpdatedBy VARCHAR(36) NOT NULL,
    PRIMARY KEY (ProfileDocumentID),
    
    FOREIGN KEY (ProfileID)
    REFERENCES t_profile(ProfileID)
    ON UPDATE CASCADE
	ON DELETE RESTRICT
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS t_profile_account (
	ProfileAccountID VARCHAR(36) NOT NULL,
    ProfileID VARCHAR(45) NOT NULL,
    LoginID INT(11) NOT NULL,
    SaltPass VARBINARY(100) NOT NULL,
    HashPass VARBINARY(100) NULL,
    RetryCount INT(11) NOT NULL,
    IsActive INT(1),
    Remarks VARCHAR(500) NULL,
    CreatedDate Datetime NOT NULL,
    CreatedBy VARCHAR(36) NOT NULL,
	LastUpdatedDate Datetime NOT NULL,
    LastUpdatedBy VARCHAR(36) NOT NULL,
    PRIMARY KEY (ProfileAccountID),
    
    FOREIGN KEY (ProfileID)
    REFERENCES t_profile(ProfileID)
    ON UPDATE CASCADE
	ON DELETE RESTRICT
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS t_travel (
	TravelID VARCHAR(36) NOT NULL,
    ProfileID VARCHAR(45) NOT NULL,
    CountryID VARCHAR(45) NOT NULL,
    TravelDescription VARCHAR(500) NOT NULL,
    TravelStartDate Datetime NOT NULL,
    TravelEndDate Datetime NOT NULL,
    IsExpired INT(1) NOT NULL,
    Remarks VARCHAR(500) NULL,
    CreatedDate Datetime NOT NULL,
    CreatedBy VARCHAR(36) NOT NULL,
	LastUpdatedDate Datetime NOT NULL,
    LastUpdatedBy VARCHAR(36) NOT NULL,
    PRIMARY KEY (TravelID),
    
    FOREIGN KEY (ProfileID)
    REFERENCES t_profile(ProfileID)
    ON UPDATE CASCADE
	ON DELETE RESTRICT,
    
    FOREIGN KEY (CountryID)
    REFERENCES t_country(CountryID)
    ON UPDATE CASCADE
	ON DELETE RESTRICT
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS t_product (
	ProductID VARCHAR(36) NOT NULL,
    ProfileID VARCHAR(36) NOT NULL,
    TravelID VARCHAR(36) NOT NULL,
    Description VARCHAR(500) NOT NULL,
    Amount Decimal(10,3) NULL,
    IsActive Int(1) NOT NULL,
    Remarks VARCHAR(500) NULL,
    CreatedDate Datetime NOT NULL,
    CreatedBy VARCHAR(36) NOT NULL,
	LastUpdatedDate Datetime NOT NULL,
    LastUpdatedBy VARCHAR(36) NOT NULL,
    PRIMARY KEY (ProductID),
    
    FOREIGN KEY (ProfileID)
    REFERENCES t_profile(ProfileID)
    ON UPDATE CASCADE
	ON DELETE RESTRICT,
   
	FOREIGN KEY (TravelID)
    REFERENCES t_travel(TravelID)
    ON UPDATE CASCADE
	ON DELETE RESTRICT
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS t_product_subcat (
	ProductSubCatID VARCHAR(36) NOT NULL,
    ProductCatID VARCHAR(36) NOT NULL,
    ProductSubCatDesc VARCHAR(500) NOT NULL,
    IsActive INT(1) NOT NULL,
    Remarks VARCHAR(500) NULL,
    CreatedDate Datetime NOT NULL,
    CreatedBy VARCHAR(36) NOT NULL,
	LastUpdatedDate Datetime NOT NULL,
    LastUpdatedBy VARCHAR(36) NOT NULL,
    PRIMARY KEY (ProductSubCatID),

	FOREIGN KEY (ProductCatID)
    REFERENCES t_product_cat(ProductCatID)
    ON UPDATE CASCADE
	ON DELETE RESTRICT
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS t_product_detail (
	ProductDetailID VARCHAR(36) NOT NULL,
    ProductID VARCHAR(36) NOT NULL,
    ProductCatID VARCHAR(36) NOT NULL,
    ProductSubCatID VARCHAR(36) NOT NULL,
    CurrencyID VARCHAR(36) NOT NULL,
    DetailDescription VARCHAR(3000) NOT NULL,
    Amount Decimal(10,3) NULL,
    Status Int(2) NOT NULL,
    Remarks VARCHAR(500) NOT NULL,
    CreatedDate Datetime NOT NULL,
    CreatedBy VARCHAR(36) NOT NULL,
	LastUpdatedDate Datetime NOT NULL,
    LastUpdatedBy VARCHAR(36) NOT NULL,
    PRIMARY KEY (ProductDetailID),
    
    FOREIGN KEY (ProductCatID)
    REFERENCES t_product_cat(ProductCatID)
    ON UPDATE CASCADE
	ON DELETE RESTRICT,
   
	FOREIGN KEY (ProductID)
    REFERENCES t_product(ProductID)
    ON UPDATE CASCADE
	ON DELETE RESTRICT,
    
    FOREIGN KEY (ProductSubCatID)
    REFERENCES t_product_subCat(ProductSubCatID)
    ON UPDATE CASCADE
	ON DELETE RESTRICT
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS t_product_document (
	ProductDocumentID VARCHAR(36) NOT NULL,
    ProductDetailID VARCHAR(36) NOT NULL,
    DocumentName VARCHAR(500) NOT NULL,
    DocumentType CHAR(20) NOT NULL,
    DocumentPath VARCHAR(500) NOT NULL,
    Remarks VARCHAR(500) NULL,
    CreatedDate Datetime NOT NULL,
    CreatedBy VARCHAR(36) NOT NULL,
	LastUpdatedDate Datetime NOT NULL,
    LastUpdatedBy VARCHAR(36) NOT NULL,
    PRIMARY KEY (ProductDocumentID),

	FOREIGN KEY (ProductDetailID)
    REFERENCES t_product_detail(ProductDetailID)
    ON UPDATE CASCADE
	ON DELETE RESTRICT
)engine=InnoDB;
-- End Certong 6/11/2017

-- ChengYew 19/12/2017
-- New table for customer order.
CREATE  TABLE t_customer_order (
  `CustomerOrderID` VARCHAR(36) NOT NULL ,
  `ProfileID` VARCHAR(36) NOT NULL ,
  `ProductDetailID` VARCHAR(36) NOT NULL ,
  `Quantity` INT NULL ,
  `Amount` DECIMAL(10,3) NULL ,
  `Remarks` VARCHAR(500) NULL ,
  `CreatedDate` DATETIME NOT NULL ,
  `CreatedBy` VARCHAR(36) NOT NULL ,
  `UpdatedDate` DATETIME NOT NULL ,
  `LastUpdatedBy` VARCHAR(36) NOT NULL ,
  PRIMARY KEY (`CustomerOrderID`) ,
  INDEX `ProfileID_idx` (`ProfileID` ASC) ,
  INDEX `ProductDetailID_idx` (`ProductDetailID` ASC) ,
  CONSTRAINT `ProfileID`
    FOREIGN KEY (`ProfileID` )
    REFERENCES `t_profile` (`ProfileID` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `ProductDetailID`
    FOREIGN KEY (`ProductDetailID` )
    REFERENCES `t_product_detail` (`ProductDetailID` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
-- END ChengYew 19/12/2017

-- Pong 04/08/2018
-- Add two new table t_chat and t_chat_detail.
CREATE TABLE IF NOT EXISTS `t_chat` (
  `ChatID` varchar(36) NOT NULL,
  `ProductDetailID` varchar(36) NOT NULL,
  `ChatProfileID_Sender` varchar(36) NOT NULL,
  `ChatProfileID_Receiver` varchar(36) NOT NULL,
  `TotalMessages` int(11) NOT NULL,
  `Remarks` varchar(500) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `CreatedBy` varchar(36) NOT NULL,
  `LastUpdatedDate` datetime NOT NULL,
  `LastUpdatedBy` varchar(36) NOT NULL,
  PRIMARY KEY (`ChatID`),
  KEY `ProductDetailID_idx` (`ProductDetailID`),
  CONSTRAINT `ProductIDetailD` FOREIGN KEY (`ProductDetailID`) REFERENCES `t_product_detail` (`ProductDetailID`) ON DELETE NO ACTION ON UPDATE NO ACTION
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS `t_chat_detail` (
  `ChatDetailID` varchar(36) NOT NULL,
  `ChatID` varchar(36) NOT NULL,
  `Message` varchar(5000) NOT NULL,
  `From` varchar(36) NOT NULL,
  `Remarks` varchar(500) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `CreatedBy` varchar(36) NOT NULL,
  `LastUpdatedDate` datetime NOT NULL,
  `LastUpdatedBy` varchar(36) NOT NULL,
  PRIMARY KEY (`ChatDetailID`),
  KEY `ChatID1_idx` (`ChatID`),
  CONSTRAINT `ChatID1` FOREIGN KEY (`ChatID`) REFERENCES `t_chat` (`ChatID`) ON DELETE NO ACTION ON UPDATE NO ACTION
)engine=InnoDB;
-- END Pong 04/08/2018

-- ChengYew 12/11/2017
-- Change t_profile_account HashPass data type and set SaltPass to not null.
ALTER TABLE `t_profile_account` CHANGE COLUMN `SaltPass` `SaltPass` VARCHAR(1000)  NULL  , CHANGE COLUMN `HashPass` `HashPass` VARCHAR(1000)  NOT NULL  ;
-- End ChengYew 12/11/2017

-- CerTong 14/11/2017
-- Add new columns in t_profile.
DROP PROCEDURE IF EXISTS shoppingu_procedure;
DELIMITER $$
CREATE PROCEDURE shoppingu_procedure()
BEGIN
	IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_NAME = 't_profile' AND COLUMN_NAME = 'Email') THEN
		ALTER TABLE t_profile ADD COLUMN Email VARCHAR(45) NULL AFTER Address;
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_NAME = 't_profile' AND COLUMN_NAME = 'ContactNo') THEN
		ALTER TABLE t_profile ADD COLUMN ContactNo VARCHAR(45) NULL AFTER Email;
    END IF;
END$$
DELIMITER ;

CALL shoppingu_procedure();
-- END CerTong 14/11/2017

-- CerTong 14/11/2017
-- Modify table t_profile_account.
DROP PROCEDURE IF EXISTS shoppingu_procedure;
DELIMITER $$
CREATE PROCEDURE shoppingu_procedure()
BEGIN
	IF EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_NAME = 't_profile_account' AND COLUMN_NAME = 'LoginID') THEN
		ALTER TABLE t_profile_account MODIFY LoginID VARCHAR(36);
    END IF;
END$$
DELIMITER ;

CALL shoppingu_procedure();
-- END CerTong 14/11/2017

-- CerTong 18/11/2017
-- Modify table t_product_detail, add column ProductName.
DROP PROCEDURE IF EXISTS shoppingu_procedure;
DELIMITER $$
CREATE PROCEDURE shoppingu_procedure()
BEGIN
	IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_NAME = 't_product_detail' AND COLUMN_NAME = 'ProductName') THEN
		ALTER TABLE t_product_detail ADD COLUMN ProductName VARCHAR(50) NOT NULL AFTER CurrencyID;
    END IF;
END$$
DELIMITER ;

CALL shoppingu_procedure();
-- END CerTong 18/11/2017

-- ChengYew 20/11/2017
-- Add 'Status' column into T_Country table.
DROP PROCEDURE IF EXISTS shoppingu_procedure;
DELIMITER $$
CREATE PROCEDURE shoppingu_procedure()
BEGIN
	IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_NAME = 't_country' AND COLUMN_NAME = 'Status') THEN
		ALTER TABLE t_country ADD COLUMN Status INT NOT NULL AFTER CountryName;
        
        UPDATE t_country
        SET Status=0
        WHERE Status IS NULL;
    END IF;
END$$
DELIMITER ;

CALL shoppingu_procedure();
-- END ChengYew 20/11/2017

-- ChengYew 10/12/2017
-- Set TravelStartDate and TravelEndDate to ullable and add 'IsRequest' column into T_Travel table.
ALTER TABLE `t_travel` CHANGE COLUMN `TravelStartDate` `TravelStartDate` DATETIME NULL  , CHANGE COLUMN `TravelEndDate` `TravelEndDate` DATETIME NULL;

DROP PROCEDURE IF EXISTS shoppingu_procedure;
DELIMITER $$
CREATE PROCEDURE shoppingu_procedure()
BEGIN
    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_NAME = 't_travel' AND COLUMN_NAME = 'IsRequest') THEN
        ALTER TABLE t_travel ADD COLUMN IsRequest INT(1) NOT NULL AFTER TravelEndDate ;

        UPDATE t_travel
        SET IsRequest=0
        WHERE IsRequest IS NULL;
    END IF;
END$$
DELIMITER ;
-- ChengYew 10/12/2017

-- ChengYew 05/01/2018
-- Add new column PostType in t_product table.
ALTER TABLE t_product ADD COLUMN PostType INT(2) NOT NULL  AFTER Amount;

UPDATE t_product
SET PostType=0
WHERE TravelID!='';
-- END ChengYew 05/01/2018

-- ChengYew 02/02/2018
-- Add new column ProductID in t_chat table.
ALTER TABLE t_chat ADD COLUMN ProductID VARCHAR(36) NOT NULL  AFTER ChatID , 
  ADD CONSTRAINT ProductID
  FOREIGN KEY (ProductID)
  REFERENCES t_product (ProductID)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
, ADD INDEX ProductID_idx (ProductID ASC) ;
-- END ChengYew 02/02/2018

-- KaaSheng 17/06/2018
-- Add new column CountryID in t_profile table.
ALTER TABLE t_profile ADD COLUMN CountryID VARCHAR(36) NOT NULL;
-- END KaaSheng 17/06/2018