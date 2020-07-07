<?php
	require_once "conn.php";

	class Dashboard {

		public static function get_total_schools($conn) {
			try {
				$query = $conn->prepare("SELECT * FROM school");
				$query->execute();

				return $query->rowCount();
			} catch(PDOException $ex) {
				return 0;
			}
		}

		public static function get_total_students($conn) {
			try {
				$query = $conn->prepare("SELECT * FROM student");
				$query->execute();

				return $query->rowCount();
			} catch(PDOException $ex) {
				return 0;
			}
		}

		public static function get_total_teachers($conn) {
			try {
				$query = $conn->prepare("SELECT * FROM teacher");
				$query->execute();

				return $query->rowCount();
			} catch(PDOException $ex) {
				return 0;
			}
		}

		public static function get_total_parents($conn) {
			try {
				$query = $conn->prepare("SELECT * FROM parent");
				$query->execute();

				return $query->rowCount();
			} catch(PDOException $ex) {
				return 0;
			}
		}

		public static function get_total_countries($conn) {
			try {
				$query = $conn->prepare("SELECT * FROM countries WHERE status = :status");
				$query->execute([':status' => 'Active']);

				return $query->rowCount();
			} catch(PDOException $ex) {
				return 0;
			}
		}

		public static function get_total_admins($conn) {
			try {
				$query = $conn->prepare("SELECT * FROM admin");
				$query->execute();

				return $query->rowCount();
			} catch(PDOException $ex) {
				return 0;
			}
		}
		
	}

?>