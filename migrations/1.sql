CREATE TABLE `persons` (
  `personID` int(11) NOT NULL AUTO_INCREMENT,
  `personName` varchar(255) DEFAULT NULL,
  `personEmail` varchar(100) NOT NULL,
  `personPassword` varchar(40) NOT NULL,
  PRIMARY KEY (`personID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cars` (
  `carID` int(11) NOT NULL AUTO_INCREMENT,
  `modelCar` varchar(100) NOT NULL,
  `yearCar` int(11) NOT NULL,
  `colorCar` varchar(50) NOT NULL,
  PRIMARY KEY (`carID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
