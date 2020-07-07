<?php
    require_once 'conn.php';
	require_once 'methods.php';

	class Parents {

        public function read_parents($conn){
            try{
                // $query = $conn->prepare('SELECT parent.fullname, parent.phone, parent.email, parent.location, parent.longitude, parent.latitude, parent.regCountry, parent.occupation, parent.relation, parent.dor, parent.lastLocUpdate, parent.status, parent_child.parentID, parent_child.studentID, student.School_id, student.class, school.schoolname, student.firstname, student.othernames, student.lastname, c.country_name FROM parent, parent_child, student, school WHERE parent.parentid = parent_child.parentID AND student.studentid = parent_child.studentID AND student.School_id = school.School_id INNER JOIN countries c ON t.country_id = c.id');
                $query = $conn->prepare('SELECT pa.fullname, pa.phone, pa.email, pa.location, pa.longitude, pa.latitude, pa.regCountry, pa.occupation, pa.relation, pa.dor, pa.lastLocUpdate, pa.status, st.firstname, st.othernames, st.lastname, st.class, sc.schoolname, co.country_name FROM parent pa INNER JOIN parent_child pc ON pa.parentid = pc.parentID INNER JOIN student st ON pc.studentID = st.studentid INNER JOIN school sc ON st.School_id = sc.School_id INNER JOIN countries co ON sc.country = co.id');
                $query->execute();

                return $query->fetchAll(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

        public function read_parents_for_school_message($School_id, $conn){
            try{
                $query = $conn->prepare('SELECT pa.parentid, pa.fullname, pa.phone, pa.email, pa.relation, pc.studentID, pc.parentID, st.firstname, st.othernames, st.lastname FROM parent pa INNER JOIN parent_child pc ON pa.parentid = pc.parentID INNER JOIN student st ON pc.studentID = st.studentid INNER JOIN school sc ON st.School_id = sc.School_id WHERE sc.School_id = :School_id ORDER BY st.firstname');
                $query->execute([':School_id' => $School_id]);

                return $query->fetchAll(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

        public function read_parents_for_teacher_message($School_id, $class, $conn){
            try{
                $query = $conn->prepare('SELECT pa.parentid, pa.fullname, pa.phone, pa.email, pa.relation, pc.studentID, pc.parentID, st.firstname, st.othernames, st.lastname FROM parent pa INNER JOIN parent_child pc ON pa.parentid = pc.parentID INNER JOIN student st ON pc.studentID = st.studentid INNER JOIN school sc ON st.School_id = sc.School_id WHERE sc.School_id = :School_id AND st.class = :class ORDER BY st.firstname');
                $query->execute([':School_id' => $School_id, ':class' => $class]);

                return $query->fetchAll(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

	}