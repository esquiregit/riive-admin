<?php
	header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/audit_trail.php";
    require "classes/country.php";
    require "classes/methods.php";

    $conn     = $pdo->open();
	$data 	  = file_get_contents("php://input");
	$request  = json_decode($data);//die(print_r($request));
	$id       = Methods::validate_string($request->id);
	$admin    = Methods::validate_string($request->admin);
	$action   = Methods::validate_string(ucfirst($request->action));
	$response = array();
	$name     = ucwords(Country::read_country_name($id, $conn));

	if(strtolower($action) === 'unblock') {
		$result = Country::unblock_country_by_id($id, $conn);
	} else if(strtolower($action) === 'block') {
		$result = Country::block_country_by_id($id, $conn);
	}

	if($result) {
		array_push($response, array(
			"status"  => "Success",
			"message" => $name." ".$action."ed Successfully...."
		));
		Audit_Trail::create_log($admin, $action.'ed '.$name, $conn);
	} else {
		array_push($response, array(
			"status"  => "Error",
			"message" => "Couldn't ".$action."ed ".$name.". Please Try Again...."
		));
		Audit_Trail::create_log($admin, 'Tried To '.$action.' '.$name, $conn);
	}

    $pdo->close();
    echo json_encode($response);
?>