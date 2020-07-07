<?php
	header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/dashboard.php";

    $conn      = $pdo->open();
	$response  = array();

	array_push($response, array(
		'total_schools'   => Dashboard::get_total_schools($conn),
		'total_parents'   => Dashboard::get_total_parents($conn),
		'total_students'  => Dashboard::get_total_students($conn),
		'total_teachers'  => Dashboard::get_total_teachers($conn),
		'total_countries' => Dashboard::get_total_countries($conn),
		'total_admins'    => Dashboard::get_total_admins($conn),
	));

    $pdo->close();
    echo json_encode($response);
?>