/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : test_db

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 01/12/2021 23:42:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_access
-- ----------------------------
DROP TABLE IF EXISTS `admin_access`;
CREATE TABLE `admin_access` (
  `access_id` int NOT NULL,
  `access_name` varchar(32) NOT NULL,
  PRIMARY KEY (`access_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of admin_access
-- ----------------------------
BEGIN;
INSERT INTO `admin_access` VALUES (1, 'Login');
INSERT INTO `admin_access` VALUES (2, 'Create Users');
INSERT INTO `admin_access` VALUES (3, 'Edit Users');
INSERT INTO `admin_access` VALUES (4, 'Delete Users');
INSERT INTO `admin_access` VALUES (5, 'Change user access');
INSERT INTO `admin_access` VALUES (6, 'View orders');
INSERT INTO `admin_access` VALUES (7, 'Edit orders');
INSERT INTO `admin_access` VALUES (8, 'Complete orders');
COMMIT;

-- ----------------------------
-- Table structure for admin_type
-- ----------------------------
DROP TABLE IF EXISTS `admin_type`;
CREATE TABLE `admin_type` (
  `type_id` int NOT NULL,
  `type_name` varchar(32) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of admin_type
-- ----------------------------
BEGIN;
INSERT INTO `admin_type` VALUES (10, 'Admin');
INSERT INTO `admin_type` VALUES (11, 'Superadmin');
INSERT INTO `admin_type` VALUES (12, 'Client');
COMMIT;

-- ----------------------------
-- Table structure for user_admin
-- ----------------------------
DROP TABLE IF EXISTS `user_admin`;
CREATE TABLE `user_admin` (
  `admin_id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_type` int NOT NULL,
  `first_name` varchar(64) DEFAULT NULL,
  `last_name` varchar(128) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `date_created` int unsigned DEFAULT NULL,
  `date_deleted` int unsigned DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`),
  KEY `admin_type` (`admin_type`),
  CONSTRAINT `user_admin_ibfk_1` FOREIGN KEY (`admin_type`) REFERENCES `admin_type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_admin
-- ----------------------------
BEGIN;
INSERT INTO `user_admin` VALUES (1, 11, 'Victor Alfonso', 'Pérez Cruz', 'alfonsocruz092@gmail.com', '$2a$10$qEhEEcSWIrBUrFdLUnO5mOAV0H.URKfsT7ZVZ06EUBN2FIOKY20pm', 0, 1638202848, NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_admin_access
-- ----------------------------
DROP TABLE IF EXISTS `user_admin_access`;
CREATE TABLE `user_admin_access` (
  `admin_id` int unsigned NOT NULL,
  `access_id` int NOT NULL,
  `admin_granter` int unsigned NOT NULL,
  `date_created` int unsigned DEFAULT NULL,
  PRIMARY KEY (`admin_id`,`access_id`),
  KEY `access_id` (`access_id`),
  KEY `admin_granter` (`admin_granter`),
  CONSTRAINT `user_admin_access_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `user_admin` (`admin_id`),
  CONSTRAINT `user_admin_access_ibfk_2` FOREIGN KEY (`access_id`) REFERENCES `admin_access` (`access_id`),
  CONSTRAINT `user_admin_access_ibfk_3` FOREIGN KEY (`admin_granter`) REFERENCES `user_admin` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_admin_access
-- ----------------------------
BEGIN;
INSERT INTO `user_admin_access` VALUES (1, 1, 1, 1638415050);
INSERT INTO `user_admin_access` VALUES (1, 2, 1, 1638415050);
INSERT INTO `user_admin_access` VALUES (1, 3, 1, 1638415050);
INSERT INTO `user_admin_access` VALUES (1, 4, 1, 1638415050);
INSERT INTO `user_admin_access` VALUES (1, 5, 1, 1638415050);
INSERT INTO `user_admin_access` VALUES (1, 6, 1, 1638415050);
INSERT INTO `user_admin_access` VALUES (1, 7, 1, 1638415050);
COMMIT;

-- ----------------------------
-- Procedure structure for remove_user_admin_access
-- ----------------------------
DROP PROCEDURE IF EXISTS `remove_user_admin_access`;
delimiter ;;
CREATE PROCEDURE `test_db`.`remove_user_admin_access`(adid INT UNSIGNED, accid INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1 @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
		SELECT 1 as query_error, @p1 as state, @p2 as message;
		ROLLBACK;
	END;
	START TRANSACTION;
		DELETE FROM user_admin_access WHERE admin_id=adid AND access_id=accid;
	COMMIT;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table user_admin
-- ----------------------------
DROP TRIGGER IF EXISTS `created_user_admin`;
delimiter ;;
CREATE TRIGGER `created_user_admin` BEFORE INSERT ON `user_admin` FOR EACH ROW BEGIN
	IF (new.date_created IS NULL) THEN
		SET new.date_created = UNIX_TIMESTAMP();
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table user_admin
-- ----------------------------
DROP TRIGGER IF EXISTS `updated_user_admin`;
delimiter ;;
CREATE TRIGGER `updated_user_admin` BEFORE UPDATE ON `user_admin` FOR EACH ROW BEGIN
	IF(new.deleted=1 AND old.deleted=0) THEN -- DELETED
		SET new.date_deleted = UNIX_TIMESTAMP();
	ELSEIF(new.deleted=0 AND old.deleted=1) THEN -- UNDELETE
		SET new.date_deleted = NULL;
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table user_admin_access
-- ----------------------------
DROP TRIGGER IF EXISTS `created_user_admin_access`;
delimiter ;;
CREATE TRIGGER `created_user_admin_access` BEFORE INSERT ON `user_admin_access` FOR EACH ROW BEGIN
	IF (new.date_created IS NULL) THEN
		SET new.date_created = UNIX_TIMESTAMP();
	END IF;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
