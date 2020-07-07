<?php
	header('Content-Type: application/json');
    require "classes/conn.php";

    $conn     = $pdo->open();
	$response = array();
	$query    = $conn->prepare('SELECT t.id, t.name, t.contact, t.email, t.country_id, t.username, t.schoolCode, t.accountType, t.status, t.reset_code, t.image, sc.School_id, sc.schoolname, c.country_name FROM teacher t INNER JOIN school sc ON t.schoolCode = sc.School_id INNER JOIN countries c ON t.country_id = c.id ORDER BY sc.schoolname, t.status asc, t.name asc, t.id asc');
    $query->execute();
	$result   = $query->fetchAll(PDO::FETCH_OBJ);;

	foreach ($result as $teacher) {
		array_push($response, array(
			"id"    	   => $teacher->id,
			"name"   	   => $teacher->name,
			"contact"      => $teacher->contact,
			"email"        => $teacher->email,
			"country_id"   => $teacher->country_id,
			"country_name" => $teacher->country_name,
			"school_name"  => $teacher->schoolname,
			"username"     => $teacher->username,
			"school_id"    => $teacher->schoolCode,
			"access_level" => $teacher->accountType,
			"status"       => $teacher->status,
			"reset_code"   => $teacher->reset_code,
			"schoolname"   => $teacher->schoolname,
            'country_name' => $teacher->country_name,
			"image"        => (empty($teacher->image)) ? "pictures/avatar.png" : $teacher->image
		));
	}

	$pdo->close();
    echo json_encode($response);
?>