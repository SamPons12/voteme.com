-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 20, 2026 at 06:08 PM
-- Server version: 12.3.1-MariaDB-ubu2404
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `voteme`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `inserted_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`, `inserted_on`, `updated_at`, `enabled`) VALUES
(1, 'Juego del Año', 'Premio al mejor juego del año 2025', '2026-02-21 14:30:43', '2026-03-19 18:28:43', 0),
(2, 'Mejor Dirección de Juego', 'Premio a la mejor dirección de juego', '2026-02-21 14:30:43', '2026-03-19 18:28:45', 0),
(3, 'Mejor Narrativa', 'Premio a la mejor narrativa en un juego', '2026-02-21 14:30:43', '2026-02-21 14:30:43', 1),
(4, 'Mejor Dirección de Arte', 'Premio a la mejor dirección de arte', '2026-02-21 14:30:43', '2026-03-19 18:28:40', 1),
(5, 'Mejor Banda Sonora', 'Premio a la mejor música o banda sonora', '2026-02-21 14:30:43', '2026-03-19 18:29:05', 1),
(6, 'Mejor Diseño de Sonido', 'Premio al mejor diseño de audio', '2026-02-21 14:30:43', '2026-03-19 16:44:27', 0),
(7, 'Mejor Actuación', 'Premio a la mejor actuación de un actor en un juego', '2026-02-21 14:30:43', '2026-03-19 16:44:28', 0),
(8, 'Mejor Juego en Curso', 'Premio al mejor juego en curso o con contenido continuo', '2026-02-21 14:30:43', '2026-03-19 16:44:30', 0),
(9, 'Mejor Juego Independiente', 'Premio al mejor juego independiente', '2026-02-21 14:30:43', '2026-03-19 16:44:31', 0),
(10, 'Mejor Juego Móvil', 'Premio al mejor juego para dispositivos móviles', '2026-02-21 14:30:43', '2026-03-19 16:44:34', 0),
(11, 'Mejor Juego VR/AR', 'Premio al mejor juego de realidad virtual o aumentada', '2026-02-21 14:30:43', '2026-02-21 14:30:43', 1),
(12, 'Mejor Juego de Acción', 'Premio al mejor juego de acción', '2026-02-21 14:30:43', '2026-02-21 14:30:43', 1),
(13, 'Mejor Juego de Acción/Aventura', 'Premio al mejor juego de acción y aventura', '2026-02-21 14:30:43', '2026-02-21 14:30:43', 1),
(14, 'Mejor Juego de Rol', 'Premio al mejor juego de rol', '2026-02-21 14:30:43', '2026-02-21 14:30:43', 1),
(15, 'Mejor Juego de Lucha', 'Premio al mejor juego de lucha', '2026-02-21 14:30:43', '2026-02-21 14:30:43', 1),
(16, 'Mejor Juego Familiar', 'Premio al mejor juego familiar', '2026-02-21 14:30:43', '2026-02-21 14:30:43', 1),
(17, 'Mejor Juego de Estrategia', 'Premio al mejor juego de estrategia', '2026-02-21 14:30:43', '2026-02-21 14:30:43', 1),
(18, 'Mejor Juego de Deportes/Carreras', 'Premio al mejor juego de deportes o carreras', '2026-02-21 14:30:43', '2026-02-21 14:30:43', 1),
(19, 'Mejor Juego Multijugador', 'Premio al mejor juego multijugador', '2026-02-21 14:30:43', '2026-02-21 14:30:43', 1),
(20, 'Innovación en Accesibilidad', 'Premio a la mejor innovación en accesibilidad', '2026-02-21 14:30:43', '2026-02-21 14:30:43', 1),
(21, 'test', 'test', '2026-03-19 19:19:13', '2026-03-19 19:19:13', 1),
(22, 'test', 'testt', '2026-03-19 19:19:51', '2026-03-19 19:19:51', 1),
(23, 'teststst', 'testtsds', '2026-03-19 19:22:53', '2026-03-19 19:22:53', 1),
(24, 'sdfsdf', 'sdfdf', '2026-03-19 19:23:28', '2026-03-19 19:23:28', 1),
(25, 'axfcsdcfn', 'asdolfb', '2026-03-19 19:24:02', '2026-03-19 19:24:02', 1);

-- --------------------------------------------------------

--
-- Table structure for table `editions`
--

CREATE TABLE `editions` (
  `edition_id` uuid NOT NULL DEFAULT uuid(),
  `name` varchar(155) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_open` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `editions`
--

INSERT INTO `editions` (`edition_id`, `name`, `start_date`, `end_date`, `is_open`) VALUES
('1a2b3c4d-0f32-11f1-9584-c2159bee87c9', 'Periodo de votación GOTY 2025', '2026-02-25', '2026-03-10', 1),
('69880730-217a-11f1-8c64-d00298f2f7fc', 'Test54', '2026-03-22', '2026-03-27', 0);

-- --------------------------------------------------------

--
-- Table structure for table `editions_categories`
--

CREATE TABLE `editions_categories` (
  `edition_category_id` uuid NOT NULL DEFAULT uuid(),
  `edition_id` uuid NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `editions_categories`
--

INSERT INTO `editions_categories` (`edition_category_id`, `edition_id`, `category_id`) VALUES
('2102e0ca-23b1-11f1-8c23-d0fe8ab7f8b3', '1a2b3c4d-0f32-11f1-9584-c2159bee87c9', 1),
('2102e285-23b1-11f1-8c23-d0fe8ab7f8b3', '1a2b3c4d-0f32-11f1-9584-c2159bee87c9', 2),
('9f63fb06-23b1-11f1-8c23-d0fe8ab7f8b3', '1a2b3c4d-0f32-11f1-9584-c2159bee87c9', 3),
('9f63fcaa-23b1-11f1-8c23-d0fe8ab7f8b3', '1a2b3c4d-0f32-11f1-9584-c2159bee87c9', 4),
('9f63fd08-23b1-11f1-8c23-d0fe8ab7f8b3', '1a2b3c4d-0f32-11f1-9584-c2159bee87c9', 5),
('9f63fd2b-23b1-11f1-8c23-d0fe8ab7f8b3', '1a2b3c4d-0f32-11f1-9584-c2159bee87c9', 6),
('9f63fd49-23b1-11f1-8c23-d0fe8ab7f8b3', '1a2b3c4d-0f32-11f1-9584-c2159bee87c9', 7),
('9f63fd66-23b1-11f1-8c23-d0fe8ab7f8b3', '1a2b3c4d-0f32-11f1-9584-c2159bee87c9', 8),
('9f63fd85-23b1-11f1-8c23-d0fe8ab7f8b3', '1a2b3c4d-0f32-11f1-9584-c2159bee87c9', 9),
('9f63fda2-23b1-11f1-8c23-d0fe8ab7f8b3', '1a2b3c4d-0f32-11f1-9584-c2159bee87c9', 10),
('e2e19339-23b1-11f1-8c23-d0fe8ab7f8b3', '69880730-217a-11f1-8c64-d00298f2f7fc', 20),
('e2e194d8-23b1-11f1-8c23-d0fe8ab7f8b3', '69880730-217a-11f1-8c64-d00298f2f7fc', 4),
('e2e1950b-23b1-11f1-8c23-d0fe8ab7f8b3', '69880730-217a-11f1-8c64-d00298f2f7fc', 8);

-- --------------------------------------------------------

--
-- Table structure for table `editions_categories_nominees`
--

CREATE TABLE `editions_categories_nominees` (
  `id` uuid NOT NULL DEFAULT uuid(),
  `edition_category_id` uuid NOT NULL,
  `nominee_id` uuid NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `editions_categories_nominees`
--

INSERT INTO `editions_categories_nominees` (`id`, `edition_category_id`, `nominee_id`) VALUES
('3fa6c2f4-23b2-11f1-8c23-d0fe8ab7f8b3', '9f63fb06-23b1-11f1-8c23-d0fe8ab7f8b3', '128180d0-0f32-11f1-9584-c2159bee87c9'),
('3fa6c49a-23b2-11f1-8c23-d0fe8ab7f8b3', '9f63fb06-23b1-11f1-8c23-d0fe8ab7f8b3', '12818094-0f32-11f1-9584-c2159bee87c9'),
('3fa6c4fb-23b2-11f1-8c23-d0fe8ab7f8b3', '9f63fb06-23b1-11f1-8c23-d0fe8ab7f8b3', '1281821a-0f32-11f1-9584-c2159bee87c9'),
('3fa6c524-23b2-11f1-8c23-d0fe8ab7f8b3', '9f63fb06-23b1-11f1-8c23-d0fe8ab7f8b3', '12817d1a-0f32-11f1-9584-c2159bee87c9'),
('3fa6c549-23b2-11f1-8c23-d0fe8ab7f8b3', '9f63fb06-23b1-11f1-8c23-d0fe8ab7f8b3', '12817f86-0f32-11f1-9584-c2159bee87c9'),
('3fa6c56c-23b2-11f1-8c23-d0fe8ab7f8b3', '9f63fcaa-23b1-11f1-8c23-d0fe8ab7f8b3', '12818008-0f32-11f1-9584-c2159bee87c9'),
('3fa6c58f-23b2-11f1-8c23-d0fe8ab7f8b3', '9f63fcaa-23b1-11f1-8c23-d0fe8ab7f8b3', '12818148-0f32-11f1-9584-c2159bee87c9'),
('3fa6c5b1-23b2-11f1-8c23-d0fe8ab7f8b3', '9f63fd08-23b1-11f1-8c23-d0fe8ab7f8b3', '128180e4-0f32-11f1-9584-c2159bee87c9'),
('3fa6c5d4-23b2-11f1-8c23-d0fe8ab7f8b3', '9f63fd08-23b1-11f1-8c23-d0fe8ab7f8b3', '128180d0-0f32-11f1-9584-c2159bee87c9');

-- --------------------------------------------------------

--
-- Stand-in structure for view `editions_view`
-- (See below for the actual view)
--
CREATE TABLE `editions_view` (
`edition_id` uuid
,`name` varchar(155)
,`start_date` date
,`end_date` date
,`is_open` tinyint(1)
,`total_categories` bigint(21)
,`total_nominees` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `nominees`
--

CREATE TABLE `nominees` (
  `nominee_id` uuid NOT NULL DEFAULT uuid(),
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `inserted_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nominees`
--

INSERT INTO `nominees` (`nominee_id`, `name`, `description`, `enabled`, `inserted_on`, `updated_at`) VALUES
('12817d1a-0f32-11f1-9584-c2159bee87c9', 'Clair Obscur: Expedición 33', 'Nominado en los Game Awards 2025 (varias categorías, incluido Juego del Año)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12817f86-0f32-11f1-9584-c2159bee87c9', 'Death Stranding 2: En la Playa', 'Nominado en los Game Awards 2025 (varias categorías, incluido Juego del Año)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12818008-0f32-11f1-9584-c2159bee87c9', 'Donkey Kong Bananza', 'Nominado en los Game Awards 2025 (Juego del Año)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12818026-0f32-11f1-9584-c2159bee87c9', 'Hades II', 'Nominado en los Game Awards 2025 (Juego del Año y otras categorías)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12818044-0f32-11f1-9584-c2159bee87c9', 'Hollow Knight: Silksong', 'Nominado en los Game Awards 2025 (Juego del Año y Mejor Arte/Música)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12818058-0f32-11f1-9584-c2159bee87c9', 'Kingdom Come: Deliverance II', 'Nominado en los Game Awards 2025 (Juego del Año y Mejor Narrativa)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('1281806c-0f32-11f1-9584-c2159bee87c9', 'Ghost of Yotei', 'Nominado en los Game Awards 2025 (Mejor Dirección, Arte, Narrativa)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12818080-0f32-11f1-9584-c2159bee87c9', 'Split Fiction', 'Nominado en los Game Awards 2025 (Mejor Dirección de Juego, Multijugador)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12818094-0f32-11f1-9584-c2159bee87c9', 'Battlefield 6', 'Nominado en los Game Awards 2025 (Mejor Diseño de Sonido, Multijugador)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('128180a8-0f32-11f1-9584-c2159bee87c9', 'Mario Kart World', 'Nominado en los Game Awards 2025 (Mejor Deportes/Carreras, Móvil)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('128180bc-0f32-11f1-9584-c2159bee87c9', 'Sonic Racing: CrossWorlds', 'Nominado en los Game Awards 2025 (Mejor Diseño de Sonido, Deportes/Carreras)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('128180d0-0f32-11f1-9584-c2159bee87c9', 'Arc Raiders', 'Nominado en los Game Awards 2025 (Mejor Multijugador)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('128180e4-0f32-11f1-9584-c2159bee87c9', 'Elden Ring Nightreign', 'Nominado en los Game Awards 2025 (Mejor Multijugador)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('128180f8-0f32-11f1-9584-c2159bee87c9', 'Peak', 'Nominado en los Game Awards 2025 (Mejor Multijugador)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('1281810c-0f32-11f1-9584-c2159bee87c9', 'Final Fantasy XIV', 'Nominado en los Game Awards 2025 (Mejor Juego en Curso)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12818120-0f32-11f1-9584-c2159bee87c9', 'Fortnite', 'Nominado en los Game Awards 2025 (Mejor Juego en Curso)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12818134-0f32-11f1-9584-c2159bee87c9', 'Helldivers 2', 'Nominado en los Game Awards 2025 (Mejor Juego en Curso)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12818148-0f32-11f1-9584-c2159bee87c9', 'EA Sports FC 26', 'Nominado en los Game Awards 2025 (Mejor Deportes/Carreras)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('1281815c-0f32-11f1-9584-c2159bee87c9', 'F1 25', 'Nominado en los Game Awards 2025 (Mejor Deportes/Carreras)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('1281818e-0f32-11f1-9584-c2159bee87c9', 'The Alters', 'Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('128181a2-0f32-11f1-9584-c2159bee87c9', 'FINAL FANTASY TACTICS - Las Crónicas de Ivalice', 'Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12818206-0f32-11f1-9584-c2159bee87c9', 'Jurassic World Evolution 3', 'Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('1281821a-0f32-11f1-9584-c2159bee87c9', 'Civilization VII de Sid Meier', 'Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('1281822e-0f32-11f1-9584-c2159bee87c9', 'Tempest Rising', 'Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55'),
('12818242-0f32-11f1-9584-c2159bee87c9', 'Two Point Museum', 'Nominado en los Game Awards 2025 (Mejor Juego de Estrategia)', 1, '2026-02-21 14:31:55', '2026-02-21 14:31:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` uuid NOT NULL DEFAULT uuid(),
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  `inserted_on` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `role`, `enabled`, `inserted_on`, `updated_at`) VALUES
('454b83c0-1019-11f1-9584-c2159bee87c9', 'sampf2006@gmail.com', '$2b$10$k.CgXpn2H5HiVhKJMYxTn.7rSckHc1DNbZndZT7wugvWSOS1zyOIq', 'admin', 1, '2026-02-22 18:06:54', '2026-03-10 18:17:34'),
('c4dc57a8-10e7-11f1-9584-c2159bee87c9', 'gemmaraquel73@gmail.com', '$2b$10$98jFom/9MVTABcirdDKoa..QtvfeEcPRN66ja9qsfg8EQblxlxpDa', 'user', 1, '2026-02-23 18:45:05', '2026-02-23 18:45:05'),
('318a3602-1a6d-11f1-9584-c2159bee87c9', 'estrella@gmail.com', '$2b$10$T2vJIR2R17CSyNrYFl9xO.i1ThqX.z2XmRyZnubmwhk6NiQjUOde.', 'user', 1, '2026-03-07 21:32:50', '2026-03-07 21:32:50');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `vote_id` uuid NOT NULL DEFAULT uuid(),
  `user_id` uuid NOT NULL,
  `edition_category_nominee_id` uuid NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`vote_id`, `user_id`, `edition_category_nominee_id`, `created_at`) VALUES
('d3ad295b-23c3-11f1-8c23-d0fe8ab7f8b3', '454b83c0-1019-11f1-9584-c2159bee87c9', '3fa6c524-23b2-11f1-8c23-d0fe8ab7f8b3', '2026-03-19 18:45:40'),
('d3ade2f0-23c3-11f1-8c23-d0fe8ab7f8b3', '454b83c0-1019-11f1-9584-c2159bee87c9', '3fa6c58f-23b2-11f1-8c23-d0fe8ab7f8b3', '2026-03-19 18:45:40'),
('d3ae175c-23c3-11f1-8c23-d0fe8ab7f8b3', '454b83c0-1019-11f1-9584-c2159bee87c9', '3fa6c5d4-23b2-11f1-8c23-d0fe8ab7f8b3', '2026-03-19 18:45:40');

-- --------------------------------------------------------

--
-- Structure for view `editions_view`
--
DROP TABLE IF EXISTS `editions_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `editions_view`  AS SELECT `e`.`edition_id` AS `edition_id`, `e`.`name` AS `name`, `e`.`start_date` AS `start_date`, `e`.`end_date` AS `end_date`, `e`.`is_open` AS `is_open`, count(distinct `ec`.`category_id`) AS `total_categories`, count(`ecn`.`nominee_id`) AS `total_nominees` FROM ((`editions` `e` join `editions_categories` `ec` on(`e`.`edition_id` = `ec`.`edition_id`)) left join `editions_categories_nominees` `ecn` on(`ec`.`edition_category_id` = `ecn`.`edition_category_id`)) GROUP BY `e`.`edition_id` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `editions`
--
ALTER TABLE `editions`
  ADD PRIMARY KEY (`edition_id`);

--
-- Indexes for table `editions_categories`
--
ALTER TABLE `editions_categories`
  ADD PRIMARY KEY (`edition_category_id`),
  ADD KEY `fk_edition_id` (`edition_id`),
  ADD KEY `fk_category_id` (`category_id`);

--
-- Indexes for table `editions_categories_nominees`
--
ALTER TABLE `editions_categories_nominees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_edition_category_id` (`edition_category_id`),
  ADD KEY `fk_nominee_id` (`nominee_id`);

--
-- Indexes for table `nominees`
--
ALTER TABLE `nominees`
  ADD PRIMARY KEY (`nominee_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`vote_id`),
  ADD KEY `fk_user_id` (`user_id`),
  ADD KEY `fk_edition_category_nominee_id` (`edition_category_nominee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `editions_categories`
--
ALTER TABLE `editions_categories`
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `fk_edition_id` FOREIGN KEY (`edition_id`) REFERENCES `editions` (`edition_id`);

--
-- Constraints for table `editions_categories_nominees`
--
ALTER TABLE `editions_categories_nominees`
  ADD CONSTRAINT `fk_edition_category_id` FOREIGN KEY (`edition_category_id`) REFERENCES `editions_categories` (`edition_category_id`),
  ADD CONSTRAINT `fk_nominee_id` FOREIGN KEY (`nominee_id`) REFERENCES `nominees` (`nominee_id`);

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `fk_edition_category_nominee_id` FOREIGN KEY (`edition_category_nominee_id`) REFERENCES `editions_categories_nominees` (`id`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
