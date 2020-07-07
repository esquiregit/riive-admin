<?php
	header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/school.php";

    $conn     = $pdo->open();
	$response = array();
	$result   = school::read_schools($conn);

	foreach ($result as $school) {
		array_push($response, array(
			'email'        => strtolower($school->email),
			'image'        => $school->image,
			'phone'        => $school->phone,
			'region'       => $school->region,
			'status'       => ucwords($school->status),
			'website'      => $school->website,
			'School_id'    => $school->School_id,
			'location'     => ucwords($school->location),
			'schoolname'   => ucwords($school->schoolname),
			'regionname'   => ucwords($school->regionName),
			'country_name' => ucwords($school->country_name),
		));
	}

    $pdo->close();
    echo json_encode($response);
?>