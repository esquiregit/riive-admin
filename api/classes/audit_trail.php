<?php

	class Audit_Trail {

		public static function create_log($admin_id, $activity, $conn) {
			try{
				$query = $conn->prepare('INSERT INTO audit_trail(admin_id, activity, date) VALUES(:admin_id, :activity, NOW())');
				$query->execute([':admin_id' => $admin_id, ':activity' => $activity]);

				return true;
			}catch(PDOException $ex){die($ex);
				return false;
			}
		}

		public static function read_logs($conn) {
			try{
				$query = $conn->prepare('SELECT ad.id, ad.school_id, ad.teacher_id, ad.admin_id, ad.activity, ad.date, am.firstname, am.lastname, am.access_level, sc.School_id, sc.schoolname, t.name FROM audit_trail ad LEFT JOIN admin am On ad.admin_id = am.id LEFT JOIN school sc ON ad.school_id = sc.School_id LEFT JOIN teacher t ON ad.teacher_id = t.id ORDER BY ad.date desc, ad.id desc');
				$query->execute();

				return $query->fetchAll(PDO::FETCH_OBJ);
			}catch(PDOException $ex){}
		}

	}