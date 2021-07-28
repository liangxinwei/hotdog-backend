------------------------------区域/地址相关--------------------------------

SET NAMES utf8mb4;

----------------------------省份----------------------------------
DROP TABLE IF EXISTS `province`;

CREATE TABLE `province` (
  `code` varchar(16) NOT NULL COMMENT '省份 code',
  `name` varchar(16) NOT NULL COMMENT '省份',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `province` WRITE;

INSERT INTO `province` (`code`, `name`)
VALUES ('65','新疆维吾尔自治区');

UNLOCK TABLES;
----------------------------省份----------------------------------


----------------------------城市----------------------------------
DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `code` varchar(16) NOT NULL COMMENT '城市 code',
  `province_code` varchar(16) NOT NULL COMMENT '所属省份',
  `name` varchar(20) NOT NULL COMMENT '城市',
  PRIMARY KEY (`code`),
  KEY `province_code` (`province_code`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`province_code`) REFERENCES `province` (`code`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `city` WRITE;

INSERT INTO `city` (`code`, `province_code`, `name`)
VALUES ('1306','13','保定市');

UNLOCK TABLES;
----------------------------城市----------------------------------


----------------------------区县----------------------------------
DROP TABLE IF EXISTS `district`;

CREATE TABLE `district` (
  `code` varchar(16) NOT NULL COMMENT '区县 code',
  `province_code` varchar(16) NOT NULL COMMENT '所属省份',
  `city_code` varchar(16) NOT NULL COMMENT '所属城市',
  `name` varchar(255) NOT NULL COMMENT '区县',
  PRIMARY KEY (`code`),
  KEY `province_code` (`province_code`),
  KEY `city_code` (`city_code`),
  CONSTRAINT `district_ibfk_1` FOREIGN KEY (`province_code`) REFERENCES `province` (`code`) ON UPDATE CASCADE,
  CONSTRAINT `district_ibfk_2` FOREIGN KEY (`city_code`) REFERENCES `city` (`code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `district` WRITE;

INSERT INTO `district` (`code`, `province_code`, `city_code`, `name`)
VALUES ('110101','11','1101','东城区');

UNLOCK TABLES;
----------------------------区县----------------------------------


----------------------------街道----------------------------------
DROP TABLE IF EXISTS `street`;

CREATE TABLE `street` (
  `code` varchar(16) NOT NULL COMMENT '街道 code',
  `province_code` varchar(16) NOT NULL COMMENT '所属省份',
  `city_code` varchar(16) NOT NULL COMMENT '所属城市',
  `district_code` varchar(16) NOT NULL COMMENT '所属区县',
  `name` varchar(255) NOT NULL COMMENT '街道',
  PRIMARY KEY (`code`),
  KEY `province_code` (`province_code`),
  KEY `city_code` (`city_code`),
  KEY `district_code` (`district_code`),
  CONSTRAINT `street_ibfk_1` FOREIGN KEY (`province_code`) REFERENCES `province` (`code`) ON UPDATE CASCADE,
  CONSTRAINT `street_ibfk_2` FOREIGN KEY (`city_code`) REFERENCES `city` (`code`) ON UPDATE CASCADE,
  CONSTRAINT `street_ibfk_3` FOREIGN KEY (`district_code`) REFERENCES `district` (`code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `street` WRITE;

INSERT INTO `street` (`code`, `province_code`, `city_code`, `district_code`, `name`)
VALUES ('110101001','11','1101','110101','东华门街道');

UNLOCK TABLES;
----------------------------街道----------------------------------


----------------------------村、小区----------------------------------
DROP TABLE IF EXISTS `village`;

CREATE TABLE `village` (
  `code` varchar(16) NOT NULL COMMENT '村、小区 code',
  `province_code` varchar(16) NOT NULL COMMENT '所属省份',
  `city_code` varchar(16) NOT NULL COMMENT '所属城市',
  `district_code` varchar(16) NOT NULL COMMENT '所属区县',
  `street_code` varchar(16) NOT NULL COMMENT '所属街道',
  `name` varchar(255) NOT NULL COMMENT '村、小区',
  PRIMARY KEY (`code`),
  KEY `province_code` (`province_code`),
  KEY `city_code` (`city_code`),
  KEY `district_code` (`district_code`),
  KEY `street_code` (`street_code`),
  CONSTRAINT `village_ibfk_1` FOREIGN KEY (`province_code`) REFERENCES `province` (`code`) ON UPDATE CASCADE,
  CONSTRAINT `village_ibfk_2` FOREIGN KEY (`city_code`) REFERENCES `city` (`code`) ON UPDATE CASCADE,
  CONSTRAINT `village_ibfk_3` FOREIGN KEY (`district_code`) REFERENCES `district` (`code`) ON UPDATE CASCADE,
  CONSTRAINT `village_ibfk_4` FOREIGN KEY (`street_code`) REFERENCES `street` (`code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
----------------------------村、小区----------------------------------
