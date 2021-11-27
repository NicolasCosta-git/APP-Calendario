
CREATE DATABASE IF NOT EXISTS `calendar`;
USE `calendar`;

CREATE TABLE IF NOT EXISTS `Users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `Events` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `day` int DEFAULT NULL,
  `month` int DEFAULT NULL,
  `year` int DEFAULT NULL,
  `title` varchar(400) DEFAULT NULL,
  `startingTime` varchar(200) DEFAULT NULL,
  `endingTime` varchar(200) DEFAULT NULL,
  `description` text,
  `image` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `Passwordtokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(200) DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `used` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `passwordtokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
