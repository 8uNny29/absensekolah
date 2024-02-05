-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for absensekolah
CREATE DATABASE IF NOT EXISTS `absensekolah` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `absensekolah`;

-- Dumping structure for table absensekolah.data
CREATE TABLE IF NOT EXISTS `data` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.verifikasi
CREATE TABLE IF NOT EXISTS `verifikasi` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `kode_verif` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.xii_tbsm
CREATE TABLE IF NOT EXISTS `xii_tbsm` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.xii_tkj_1
CREATE TABLE IF NOT EXISTS `xii_tkj_1` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.xii_tkj_2
CREATE TABLE IF NOT EXISTS `xii_tkj_2` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.xii_tkj_3
CREATE TABLE IF NOT EXISTS `xii_tkj_3` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.xi_tbsm
CREATE TABLE IF NOT EXISTS `xi_tbsm` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.xi_tkj_1
CREATE TABLE IF NOT EXISTS `xi_tkj_1` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.xi_tkj_2
CREATE TABLE IF NOT EXISTS `xi_tkj_2` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.xi_tkj_3
CREATE TABLE IF NOT EXISTS `xi_tkj_3` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.x_tbsm
CREATE TABLE IF NOT EXISTS `x_tbsm` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.x_tkj_1
CREATE TABLE IF NOT EXISTS `x_tkj_1` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.x_tkj_2
CREATE TABLE IF NOT EXISTS `x_tkj_2` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table absensekolah.x_tkj_3
CREATE TABLE IF NOT EXISTS `x_tkj_3` (
  `nama_murid` char(50) DEFAULT NULL,
  `kelas` char(50) DEFAULT NULL,
  `tanggal` char(50) DEFAULT NULL,
  `waktu` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
