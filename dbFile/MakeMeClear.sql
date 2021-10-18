/*
SQLyog Community v13.1.1 (32 bit)
MySQL - 10.1.31-MariaDB : Database - makemeclear
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`makemeclear` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `makemeclear`;

/*Table structure for table `caries` */

DROP TABLE IF EXISTS `caries`;

CREATE TABLE `caries` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(11) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `Buccal` tinyint(1) DEFAULT '0',
  `Distal` tinyint(1) DEFAULT '0',
  `Lingual` tinyint(1) DEFAULT '0',
  `Mesial` tinyint(1) DEFAULT '0',
  `Occlusal` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `caries` */

insert  into `caries`(`ID`,`PatientID`,`SelectedTeeth`,`Buccal`,`Distal`,`Lingual`,`Mesial`,`Occlusal`) values 
(1,53,'36,35,34',0,0,0,0,0),
(2,53,'36,35,34',1,0,0,0,0);

/*Table structure for table `fracture` */

DROP TABLE IF EXISTS `fracture`;

CREATE TABLE `fracture` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(10) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `FractureValue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `fracture` */

insert  into `fracture`(`ID`,`PatientID`,`SelectedTeeth`,`FractureValue`) values 
(1,53,'24,22,21','Crown');

/*Table structure for table `gingivalovergrowth` */

DROP TABLE IF EXISTS `gingivalovergrowth`;

CREATE TABLE `gingivalovergrowth` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(10) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `GingivalOvergrowth` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `gingivalovergrowth` */

/*Table structure for table `gingivalrecession` */

DROP TABLE IF EXISTS `gingivalrecession`;

CREATE TABLE `gingivalrecession` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(11) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `GingivalRecessionvalue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `gingivalrecession` */

insert  into `gingivalrecession`(`ID`,`PatientID`,`SelectedTeeth`,`GingivalRecessionvalue`) values 
(1,53,'22,48,47','Mild');

/*Table structure for table `gingivitis` */

DROP TABLE IF EXISTS `gingivitis`;

CREATE TABLE `gingivitis` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(10) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `Gingivitisvalue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `gingivitis` */

/*Table structure for table `gummysmile` */

DROP TABLE IF EXISTS `gummysmile`;

CREATE TABLE `gummysmile` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(10) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `GummySmile` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `gummysmile` */

/*Table structure for table `largemaxillarysinus` */

DROP TABLE IF EXISTS `largemaxillarysinus`;

CREATE TABLE `largemaxillarysinus` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(10) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `LargeMaxillarySinus` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `largemaxillarysinus` */

/*Table structure for table `mobility` */

DROP TABLE IF EXISTS `mobility`;

CREATE TABLE `mobility` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(10) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `Mobilityvalue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `mobility` */

/*Table structure for table `periodontitis` */

DROP TABLE IF EXISTS `periodontitis`;

CREATE TABLE `periodontitis` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(10) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `Periodontitisvalue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `periodontitis` */

/*Table structure for table `plaquehygiene` */

DROP TABLE IF EXISTS `plaquehygiene`;

CREATE TABLE `plaquehygiene` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(10) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `PlaqueHygienevalue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `plaquehygiene` */

insert  into `plaquehygiene`(`ID`,`PatientID`,`SelectedTeeth`,`PlaqueHygienevalue`) values 
(1,53,'18,17,22','Mild');

/*Table structure for table `severelydamanged` */

DROP TABLE IF EXISTS `severelydamanged`;

CREATE TABLE `severelydamanged` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(10) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `severelydamaged` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `severelydamanged` */

insert  into `severelydamanged`(`ID`,`PatientID`,`SelectedTeeth`,`severelydamaged`) values 
(1,53,'17,18,16',1);

/*Table structure for table `tbl_patient` */

DROP TABLE IF EXISTS `tbl_patient`;

CREATE TABLE `tbl_patient` (
  `PatientID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Gender` varchar(50) DEFAULT NULL,
  `Notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PatientID`)
) ENGINE=MyISAM AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_patient` */

insert  into `tbl_patient`(`PatientID`,`Name`,`Email`,`Phone`,`Gender`,`Notes`) values 
(36,'manish','rkpatidar77730@gmail.com','6266003513','male',''),
(52,'Poojasharma','poojavi@gmail.com','','female','Bad Teeth'),
(32,'palkesh','palkesh@gmail.com','','male',''),
(33,'sandeep j','geetha@gmail.com','','female',''),
(41,'gothi','gothi@gmail.com','9131','male','eee'),
(53,'avinash','null','null','null','null'),
(79,'sankar','rahulberchha@gmail.com','','male',''),
(80,'rahul','rahul@gmail.com','9752885711','male','');

/*Table structure for table `tbl_plan` */

DROP TABLE IF EXISTS `tbl_plan`;

CREATE TABLE `tbl_plan` (
  `PlanID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(11) DEFAULT NULL,
  `PatientName` varchar(255) DEFAULT NULL,
  `PlanName` varchar(255) DEFAULT NULL,
  `Status` tinyint(2) DEFAULT '1',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`PlanID`)
) ENGINE=MyISAM AUTO_INCREMENT=83 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_plan` */

insert  into `tbl_plan`(`PlanID`,`PatientID`,`PatientName`,`PlanName`,`Status`,`CreatedAt`) values 
(79,33,'sandeep ji','basic(copy)(co1py)',1,'2020-03-04 03:59:45'),
(78,53,'avinash','treat1',1,'2020-02-08 05:42:56'),
(63,33,'sandeep ji','basic(copy)',1,'2020-01-18 02:46:07'),
(77,41,'gothi','pariya',1,'2020-01-30 04:11:55'),
(59,33,'sandeep ji','basic(copy)',1,'2020-01-18 02:19:12'),
(82,33,'sandeep ji','basic(copy)(co1py)(copy)',1,'2020-12-06 13:03:31');

/*Table structure for table `tbl_user` */

DROP TABLE IF EXISTS `tbl_user`;

CREATE TABLE `tbl_user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Status` tinyint(2) DEFAULT '1',
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedOn` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`UserID`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_user` */

insert  into `tbl_user`(`UserID`,`Name`,`Email`,`Password`,`Status`,`CreatedBy`,`CreatedOn`,`UpdatedBy`,`UpdatedOn`) values 
(1,'Admin','admin@gmail.com','123456',1,NULL,'2020-01-08 00:10:45',NULL,'0000-00-00 00:00:00'),
(2,'Rahul','rahul@gmail.com','123456',1,NULL,'2020-01-08 01:12:06',NULL,'0000-00-00 00:00:00'),
(3,'Admin','admin','admin',1,NULL,'2020-03-05 03:36:12',NULL,'0000-00-00 00:00:00'),
(4,'superadmin','superadmin@gmail.com','123456789',1,NULL,'2020-01-08 06:39:47',NULL,'0000-00-00 00:00:00'),
(6,'sachin','sachin@gmail.com','1232122',1,NULL,'2020-01-10 03:35:38',NULL,'0000-00-00 00:00:00'),
(7,'hemant','hemant@gmail.com','123456',1,NULL,'2020-01-19 00:43:48',NULL,'0000-00-00 00:00:00'),
(11,'pankaj','soni@gmail.com','Pankaj',1,NULL,'2020-02-12 06:26:14',NULL,'0000-00-00 00:00:00'),
(10,'Avinash','avi@gmail.com','123',1,NULL,'2020-02-08 05:35:34',NULL,'0000-00-00 00:00:00'),
(12,'rahul gothi','rahulgothiec@gmail.com','123456',1,NULL,'2020-03-04 04:42:03',NULL,'0000-00-00 00:00:00'),
(29,'sankar','sssss@gmail.com','xzdsd',1,NULL,'2020-03-24 02:34:00',NULL,'0000-00-00 00:00:00'),
(30,'anil','anil@gmail.com','123456',1,NULL,'2020-03-30 10:48:43',NULL,'0000-00-00 00:00:00');

/*Table structure for table `wear` */

DROP TABLE IF EXISTS `wear`;

CREATE TABLE `wear` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PatientID` int(11) DEFAULT NULL,
  `SelectedTeeth` varchar(255) DEFAULT NULL,
  `Wearvalue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `wear` */

insert  into `wear`(`ID`,`PatientID`,`SelectedTeeth`,`Wearvalue`) values 
(1,53,'18,17','Moderate');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
