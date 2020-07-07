<?php
	header('Content-Type: application/json');
	require_once "classes/audit_trail.php";
	require_once "classes/country.php";
	require_once "classes/methods.php";

	$conn 		  = $pdo->open();
	$response     = array();
	$data 	      = file_get_contents("php://input");
	$request      = json_decode($data);//die(print_r($request));
	$country_code = Methods::validate_string(strtoupper($request->country_code));
	$country_name = Methods::validate_string(ucwords($request->country_name));
	$admin        = Methods::validate_string($request->admin);

	if(!isset($country_code) || !isset($country_name) || !isset($admin)) {
		array_push($response, array(
			"status"  => "Error",
			"message" => "Couldn't Add \"".$country_name."\". Please Try Again...."
		));
	} else{
		if(strlen($country_code) > 2) {
			array_push($response, array(
				"status"  => "Error",
				"message" => "Country Code Must Contain Two Characters...."
			));
		} else if(Country::is_country_code_used($country_code, $conn)) {
			array_push($response, array(
				"status"  => "Error",
				"message" => "Country Code \"" . $country_code . "\" Already Added...."
			));
		} else if(Country::is_country_name_used($country_name, $conn)) {
			array_push($response, array(
				"status"  => "Error",
				"message" => "\"" . $country_name . "\" Already Added...."
			));
		} else {
			if(Country::create_country($country_code, $country_name, $conn)) {
				array_push($response, array(
					"status"  => "Success",
					"message" => "\"".$country_name."\" Added Successfully...."
				));
	        	Audit_Trail::create_log($admin, 'Added Country "'.$country_name.'"', $conn);
			} else {
				array_push($response, array(
					"status"  => "Error",
					"message" => "\"".$country_name."\" Could Not Be Added. Please Try Again...."
				));
	        	Audit_Trail::create_log($admin, 'Tried To Add Country "'.$country_name.'"', $conn);
			}
	    }

	    $pdo->close();
	}
	echo json_encode($response);
?>