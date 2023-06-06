-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:33085
-- Tiempo de generación: 16-05-2023 a las 02:43:44
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbclub`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `master_club`
--

CREATE TABLE `master_club` (
  `idmaster` int(11) NOT NULL,
  `fechaReserva` date NOT NULL,
  `numInvitados` int(11) NOT NULL,
  `tipoEvento` varchar(30) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `comentarios` varchar(300) NOT NULL,
  `status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `master_club`
--

INSERT INTO `master_club` (`idmaster`, `fechaReserva`, `numInvitados`, `tipoEvento`, `costo`, `comentarios`, `status`) VALUES
(1, '2025-03-05', 200, 'Fiesta', '67.89', 'a todo gas', 'activo'),
(2, '2023-06-01', 30, 'Conferencia', '0.00', 'Se proporcionará equipo audiovisual', 'pendiente'),
(3, '2023-08-05', 50, 'Fiesta de cumpleaños', '3500.00', 'Se solicita decoración temática', 'activo'),
(5, '2023-10-30', 100, 'Fiesta de Halloween', '5000.00', 'Se solicita DJ y luces especiales', 'pendiente'),
(6, '2023-11-18', 20, 'Taller de yoga', '0.00', 'Se necesita espacio libre de muebles', 'activo'),
(7, '2023-12-24', 40, 'Cena de Navidad', '4500.00', 'Se requiere decoración navideña', 'activo'),
(8, '2024-01-10', 25, 'Seminario de marketing', '0.00', 'Se necesita proyector y pantalla', 'pendiente'),
(9, '2023-05-20', 2, 'Cena romántica', '1200.00', 'Se solicita mesa junto a la ventana', 'activo'),
(15, '2023-05-12', 4, 'Posada', '45.00', 'se va a poner a toda madre xd', 'inactivo'),
(16, '2023-06-15', 3, '3', '3.00', 'e', 'e'),
(17, '2023-04-20', 4, 'f', '4.00', 'f', 'f'),
(18, '2023-06-16', 44, 'Conferencia', '4.00', '44', '44');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `master_club`
--
ALTER TABLE `master_club`
  ADD PRIMARY KEY (`idmaster`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `master_club`
--
ALTER TABLE `master_club`
  MODIFY `idmaster` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
