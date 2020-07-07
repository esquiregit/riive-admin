<?php
	require_once 'conn.php';

	class Security {

        public function read_securities($conn){
            try{
                $query = $conn->prepare('SELECT sec.name, sec.contact, sec.accountType, sc.schoolname, co.country_name FROM security sec INNER JOIN school sc ON sec.schoolCode = sc.School_id INNER JOIN countries co ON sc.country = co.id');
                $query->execute();

                return $query->fetchAll(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

        public function read_school_securities($schoolCode, $conn){
            try{
                $query = $conn->prepare('SELECT sec.id, sec.name, sec.contact, sec.schoolCode, sec.accountType, sc.schoolname, sc.School_id FROM security sec INNER JOIN school sc ON sec.schoolCode = sc.School_id WHERE sec.schoolCode = :schoolCode');
                $query->execute([':schoolCode' => $schoolCode]);

                return $query->fetchAll(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

        public function read_security($id, $conn) {
            try{
                $query = $conn->prepare('SELECT * FROM security INNER JOIN school ON security.schoolCode = school.School_id WHERE security.id = :id AND security.schoolCode = :schoolCode');
                $query->execute([':id' => $id, ':schoolCode' => $_SESSION['riive_school_id']]);

                return $query->fetch(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

        public function read_security_name($id, $conn) {
            try{
                $query = $conn->prepare('SELECT name FROM security WHERE id = :id');
                $query->execute([':id' => $id]);

                return $query->fetch(PDO::FETCH_OBJ)->name;
            }catch(PDOException $ex){}
        }

        public function read_security_person_approvals($security_id, $conn){
            try{
                $query = $conn->prepare('SELECT v.visitorName, v.visitorNumber, v.personToVisit, v.securityPersonId, v.clockInTime, v.clockOutTime, v.purposeOfVisit, v.imagePath, v.image, sec.name, sc.schoolname, co.country_name FROM visitor v INNER JOIN security sec ON v.securityPersonId = sec.id INNER JOIN school sc ON v.schoolID = sc.School_id INNER JOIN countries co ON sc.country = co.id WHERE v.securityPersonId = :security_id');
                $query->execute([':security_id' => $security_id]);
                
                return $query->fetchAll(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

        public function read_securities_info($conn){
            try{
                $query = $conn->prepare('SELECT id, name FROM security');
                $query->execute();

                return $query->fetchAll(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

        /*public function read_securities_info($conn){
            try{
                $query = $conn->prepare('SELECT * FROM security WHERE security.schoolCode = :schoolCode');
                $query->execute([':schoolCode' => $_SESSION['riive_school_id']]);

                return $query->fetchAll(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }*/

        public static function update_security($id, $schoolCode, $name, $contact, $conn) {
            try{
                $query = $conn->prepare('UPDATE security SET name = :name, contact = :contact WHERE id = :id AND schoolCode = :schoolCode');
                $query->execute([':name' => $name, ':contact' => $contact, ':id' => $id, ':schoolCode' => $schoolCode]);

                return true;
            } catch(PDOException $ex){die($ex);
                return false;
            }
        }

	}