-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(700) NOT NULL,
  `date` varchar(100) NOT NULL,
  `op` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Arthur','Dias','arthur.dias@live.fr','$2b$10$YV6jngiDJogPgpS1DoRQ9.NC/f8/08HpsFH9sjtAUoTVcZ4dz7ELu','2022-02-12 16:29:30.081',1),(2,'Clement','Chacon','clementchacon8@gmail.com','$2b$10$qEdbJ15VvcMSFQGCGjV7t.4GmBMaDqFoe2/hY8mcNq6ngP4V.yhFu','2022-02-12 16:43:31.194',0),(8,'Testure','Chacon','arthur.dias4@live.fr','$2b$10$dX0Apb3s/wCoiy.A7/kc8eLFNBUARddeczqjDpvCcus8Dsyqj3g9C','2022-04-03 16:03:36.081',0),(9,'Testure','Dias','arthur.dias1@live.fr','$2b$10$cagWXn8qxmF4KKdMWlAKge4GMuHh7iZXy4k7hogDZh40byoy98aAC','2022-04-03 16:21:08.012',0),(10,'Testure','Chacon','arthu1r.dias@live.fr','$2b$10$EsWl9GNPZv4qksyoKXIPmO.O5E7swBFYBUoigv3nOPYs96eM..w8i','2022-04-16 15:39:24.160',0),(11,'Admin','Admin','groupomania@gmail.com','$2b$10$REsn4eAHT3sH23I5GZoH3uMVjhXKU5QYx92qo1LsTZA5ysdyvcOuu','2022-04-22 11:44:27.689',1),(13,'Arthur','Dias','Arthur.dias.pro@hotmail.com','$2b$10$z/o8BNPaL2/uNAaNWxXCgO1lrq0Opxb6Sol5/uOHngV6QhSDjYN/i','2022-04-22 14:18:31.905',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-22 14:49:14
