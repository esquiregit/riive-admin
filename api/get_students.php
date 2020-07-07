<?php
	header('Content-Type: application/json');
    require "classes/conn.php";

    $conn     = $pdo->open();
	$response = array();
	$query    = $conn->prepare('SELECT st.studentid, st.School_id, st.firstname, st.othernames, st.lastname, st.dob, st.gender, st.class, st.studentCode, st.imagePath, st.image, sc.School_id, sc.schoolname, co.country_name FROM student st INNER JOIN school sc ON st.School_id = sc.School_id INNER JOIN countries co ON sc.country = co.id ORDER BY sc.schoolname, st.class asc, st.firstname asc, st.studentid asc');
    $query->execute();
	$result   = $query->fetchAll(PDO::FETCH_OBJ);

	foreach ($result as $student) {
		array_push($response, array(
			'dob'          => $student->dob,
			'name'         => $student->othernames ? $student->firstname.' '.$student->othernames.' '.$student->lastname : $student->firstname.' '.$student->lastname,
			'class'        => $student->class,
			'image'        => $student->image,
			'gender'       => $student->gender,
			'lastname'     => $student->lastname,
			'firstname'    => $student->firstname,
			'schoolname'   => $student->schoolname,
			'imagePath'    => $student->imagePath,
			'studentid'    => $student->studentid,
			'School_id'    => $student->School_id,
			'othernames'   => $student->othernames,
            'country_name' => $student->country_name,
			'studentCode'  => $student->studentCode,
		));
	}

    $pdo->close();
    echo json_encode($response);
?>