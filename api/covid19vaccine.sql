-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2021 at 07:51 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `covid19vaccine`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminuser`
--

CREATE TABLE `adminuser` (
  `id` smallint(6) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adminuser`
--

INSERT INTO `adminuser` (`id`, `username`, `password`, `firstname`, `lastname`, `dateCreated`) VALUES
(1, 'admin', 'admin', 'Vincent', 'Ontuca', '2021-11-10 10:04:26'),
(2, 'beastMaster64', '21232f297a57a5a743894a0e4a801f', 'Vincent', 'Ontuca', '2021-11-13 05:45:29'),
(5, 'sampleUser', '874220742d6bc36bc66b4328afc064', 'Soap', 'McTavish', '2021-11-22 00:58:03'),
(6, 'chloegrace64', 'secretpassword', 'Chloe Grace', 'Moretz', '2021-11-22 01:00:24');

-- --------------------------------------------------------

--
-- Table structure for table `firstdose`
--

CREATE TABLE `firstdose` (
  `id` smallint(6) NOT NULL,
  `recipientid` smallint(6) DEFAULT NULL,
  `vaccineid` smallint(6) DEFAULT NULL,
  `vaccineadminid` smallint(6) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `firstdose`
--

INSERT INTO `firstdose` (`id`, `recipientid`, `vaccineid`, `vaccineadminid`, `date`) VALUES
(1, 100, 1, 1, '2021-11-15 11:16:46'),
(3, 104, 2, 1, '2021-11-17 16:00:00'),
(14, 105, 2, 3, '2021-11-18 02:01:46'),
(15, 107, 2, 1, '2021-11-18 01:45:51'),
(18, 106, 2, 3, '2021-11-18 02:04:35'),
(21, 109, 2, 3, '2021-11-18 02:10:07'),
(23, 116, 3, 2, '2021-11-18 02:23:52'),
(24, 115, 2, 5, '2021-11-18 03:37:52'),
(26, 113, 5, 4, '2021-11-18 02:31:53'),
(27, 112, 5, 5, '2021-11-18 02:33:10'),
(28, 111, 23, 2, '2021-11-18 02:38:24'),
(29, 108, 24, 1, '2021-11-18 02:43:24'),
(30, 120, 3, 3, '2021-11-21 09:34:14'),
(31, 118, 2, 1, '2021-11-21 09:34:58');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` smallint(6) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `firstname`, `lastname`, `email`, `status`) VALUES
(2, 'Vincent', 'Ontuca', 'vincentontuca@gmail.com', 'Sent'),
(3, 'Edward', 'Yu', 'edward.yu@evsu.edu.ph', 'Sent'),
(4, 'Kent Claire', 'Pallomina', 'kentclaireapplejoy.pallomina@evsu.edu.ph', 'Sent'),
(5, 'Ken Bryan', 'Dipa', 'kenbryan.dipa@evsu.edu.ph', 'Sent'),
(6, 'Vincent', 'Ontuca', 'vinceeeentontuca@gmail.com', 'Sent'),
(7, 'Chloe Grace', 'Moretz', 'vincentontuca@gmail.com', 'Pending'),
(8, 'Chloe Grace', 'Moretz', 'chloegracemoretz@gmail.com', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `seconddose`
--

CREATE TABLE `seconddose` (
  `id` smallint(6) NOT NULL,
  `recipientid` smallint(6) DEFAULT NULL,
  `vaccineid` smallint(6) DEFAULT NULL,
  `vaccineadminid` smallint(6) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seconddose`
--

INSERT INTO `seconddose` (`id`, `recipientid`, `vaccineid`, `vaccineadminid`, `date`) VALUES
(1, 100, 1, 1, '2021-11-15 11:17:32'),
(2, 115, 5, 4, '2021-11-18 07:10:33'),
(4, 111, 1, 4, '2021-11-18 07:13:09'),
(5, 107, 2, 3, '2021-11-18 08:12:12'),
(6, 116, 23, 4, '2021-11-18 08:46:31'),
(7, 113, 2, 1, '2021-11-20 02:45:21');

-- --------------------------------------------------------

--
-- Table structure for table `vaccine`
--

CREATE TABLE `vaccine` (
  `id` smallint(6) NOT NULL,
  `vaccineName` varchar(20) NOT NULL,
  `stock` int(7) NOT NULL,
  `manufacturer` varchar(30) NOT NULL,
  `efficacyRate` float(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vaccine`
--

INSERT INTO `vaccine` (`id`, `vaccineName`, `stock`, `manufacturer`, `efficacyRate`) VALUES
(1, 'Sinovac', 45000, 'Sinopharm', 65.30),
(2, 'Pfizer', 120000, 'bioNtech', 98.00),
(3, 'SputnikV', 89089, 'Gamaleya', 80.00),
(5, 'Sinovac', 12344, 'Sinopharm', 96.00),
(21, 'VaccineUnnamed', 123312, 'qwerty', 75.00),
(23, 'sampleVaccine4', 44441, 'samplemanUfac4', 45.00),
(24, 'Jhonsons & Jhonsons', 120000, 'Jhonson', 67.00);

-- --------------------------------------------------------

--
-- Table structure for table `vaccineadmin`
--

CREATE TABLE `vaccineadmin` (
  `id` smallint(6) NOT NULL,
  `healthFacility` varchar(40) NOT NULL,
  `vaccinator` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vaccineadmin`
--

INSERT INTO `vaccineadmin` (`id`, `healthFacility`, `vaccinator`, `address`) VALUES
(1, 'Rural Health Sta.Fe', 'Glades P. Garon', 'Sta.Fe, Leyte'),
(2, 'RHU Carigara', 'Mike Dane', 'Carigara, Leyte, Philippines'),
(3, 'RHU Tunga', 'Jeff Daniels', 'Tunga, Leyte Philippines'),
(4, 'RHU Jaro', 'Brad Sivan', 'Jaro, Leyte'),
(5, 'RHU Alangalang', 'Boss Rodd', 'Alang-alang, Leyte');

-- --------------------------------------------------------

--
-- Table structure for table `vaccinerecipient`
--

CREATE TABLE `vaccinerecipient` (
  `id` smallint(6) NOT NULL,
  `customID` varchar(12) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `middlename` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `category` varchar(1) NOT NULL,
  `contactnum` varchar(11) NOT NULL,
  `email` varchar(40) NOT NULL,
  `address` varchar(50) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `birthday` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vaccinerecipient`
--

INSERT INTO `vaccinerecipient` (`id`, `customID`, `firstname`, `middlename`, `lastname`, `category`, `contactnum`, `email`, `address`, `gender`, `birthday`) VALUES
(100, 'RHU-100', 'Vincent', 'Goles', 'Ontuca', 'C', '09654217393', 'vinceeeentontuca@gmail.com', 'Santa Fe', 'M', '2001-01-04'),
(104, 'RHU-104', 'Stan Gabriel', 'Goles', 'Catapal', 'C', '09987656', 'stan@gmail.com', 'Sta. Fe', 'M', '2010-08-18'),
(105, 'RHU-105', 'Shielo Danielles', 'Goles', 'Catapal', 'C', '09654217888', 'shielo@gmail.com', 'San Roque, Sta. Fe', 'M', '2016-09-08'),
(106, 'RHU-106', 'Charles Lyndon', 'Goles', 'Catapal', 'C', '09662763726', 'charles@gmail.com', 'San Roque 23', 'M', '2012-09-26'),
(107, 'RHU-107', 'Zia Samantha', 'Goles', 'Catapal', 'C', '09732837823', 'zia@gmail.com', 'Santa Fe', 'F', '2018-09-16'),
(108, 'RHU-108', 'Chloe', 'Grace', 'Moretz', 'B', '09123123123', 'schloegrace@gmail.com', 'Sta. Fe, Ohio', 'F', '1996-05-05'),
(109, 'RHU-109', 'Tyler', 'Josh', 'Joseph', 'C', '09276376223', 'tyler@gmail.com', 'Sta. Fe', 'M', '1987-08-09'),
(110, 'RHU-110', 'Mike', 'Chester', 'Shinoda', 'C', '09347234632', 'mike@gmail.com', 'Sta.Fe', 'M', '1982-01-09'),
(111, 'RHU-111', 'Audrey', 'Mike', 'Hepburn', 'B', '09364723643', 'audre@gmail.com', 'Santa. Fe', 'F', '1975-08-09'),
(112, 'RHU-112', 'Angular', 'Montefalco', 'TzyTV', 'C', '09472834782', 'angular@gmail.com', 'Santa.Fe', 'F', '2002-03-21'),
(113, 'RHU-113', 'Stan Gabriel', 'Goles', 'Catapal', 'C', '09987656', 'stan@gmail.com', 'Sta. Fe', 'M', '2010-08-18'),
(114, 'RHU-114', 'CODM', 'Roblox', 'Tzy', 'C', '09834758334', 'codm@gmail.com', 'Santa. Fe', 'M', '2000-08-09'),
(115, 'RHU-115', 'Angular', 'React', 'Vue', 'D', '09318237817', 'react@gmail.com', 'Santa.Fe', 'F', '2004-05-23'),
(116, 'RHU-116', 'Gerard', 'Flippin', 'Way', 'C', '09312312312', 'gerardway@gmail.com', 'Santa Fe', 'M', '1986-04-18'),
(118, 'RHU-118', 'Glowup', 'Chuki', 'Angas', 'A', '09123523145', 'chuki@gmail.com', 'San Roque', 'F', '2018-01-04'),
(120, 'RHU-120', 'Norman', 'Madison', 'Goles', 'A', '09876876868', 'normal.madison@gmail.com', 'Santa Fe', 'M', '2017-01-08'),
(121, 'RHU-121', 'Pewdiepie', 'Matumbaman', 'Iceiceice', 'D', '09312312312', 'pewdiepie@gmail.com', 'San Roque, Sta. Fe, Leyte', 'M', '1986-03-09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `firstdose`
--
ALTER TABLE `firstdose`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipientid` (`recipientid`),
  ADD KEY `vaccineid` (`vaccineid`),
  ADD KEY `vaccineadminid` (`vaccineadminid`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seconddose`
--
ALTER TABLE `seconddose`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipientid` (`recipientid`),
  ADD KEY `vaccineid` (`vaccineid`),
  ADD KEY `vaccineadminid` (`vaccineadminid`);

--
-- Indexes for table `vaccine`
--
ALTER TABLE `vaccine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccineadmin`
--
ALTER TABLE `vaccineadmin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccinerecipient`
--
ALTER TABLE `vaccinerecipient`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminuser`
--
ALTER TABLE `adminuser`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `firstdose`
--
ALTER TABLE `firstdose`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `seconddose`
--
ALTER TABLE `seconddose`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vaccine`
--
ALTER TABLE `vaccine`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `vaccineadmin`
--
ALTER TABLE `vaccineadmin`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vaccinerecipient`
--
ALTER TABLE `vaccinerecipient`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `firstdose`
--
ALTER TABLE `firstdose`
  ADD CONSTRAINT `firstdose_ibfk_1` FOREIGN KEY (`recipientid`) REFERENCES `vaccinerecipient` (`id`),
  ADD CONSTRAINT `firstdose_ibfk_2` FOREIGN KEY (`vaccineid`) REFERENCES `vaccine` (`id`),
  ADD CONSTRAINT `firstdose_ibfk_3` FOREIGN KEY (`vaccineadminid`) REFERENCES `vaccineadmin` (`id`);

--
-- Constraints for table `seconddose`
--
ALTER TABLE `seconddose`
  ADD CONSTRAINT `seconddose_ibfk_1` FOREIGN KEY (`recipientid`) REFERENCES `vaccinerecipient` (`id`),
  ADD CONSTRAINT `seconddose_ibfk_2` FOREIGN KEY (`vaccineid`) REFERENCES `vaccine` (`id`),
  ADD CONSTRAINT `seconddose_ibfk_3` FOREIGN KEY (`vaccineadminid`) REFERENCES `vaccineadmin` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
