<?php
	header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/country.php";

    $conn     = $pdo->open();
	$response = array();
	$result   = Country::read_countries($conn);

	foreach ($result as $row) {
		array_push($response, array(
			'id'           => $row->id,
			'country_code' => $row->country_code,
			'country_name' => $row->country_name,
			'status'       => ucwords($row->status),
		));
	}

    $pdo->close();
    echo json_encode($response);
?>