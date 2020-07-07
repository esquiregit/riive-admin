<?php
	header('Content-Type: application/json');
	require_once "classes/conn.php";
	require_once "classes/audit_trail.php";
	require_once "classes/methods.php";
	require_once "classes/admin.php";

	$conn     = $pdo->open();
	$data 	  = file_get_contents("php://input");
	$request  = json_decode($data);//die(print_r($request));
	$username = Methods::validate_string($request->zxszas);
	$password = Methods::validate_string($request->njhbgt);
	$user     = array();
	$status   = array();
	$response = array();
	
    if($username && $password) {
    	$result = Admin::login_admin($username, $password, $conn);
		
		if($result) {
			array_push($user, array(
				"id"           => $result->id,
				"firstname"    => $result->firstname,
				"lastname"     => $result->lastname,
				"name"         => $result->firstname.' '.$result->lastname,
				"username"     => $result->username,
				"email"        => $result->email,
				"image"        => $result->photo,
				"access_level" => $result->access_level,
				"last_login"   => $result->last_login,
				"status"       => $result->status,
				"reset_code"   => $result->reset_code,
			));
			array_push($status, array(
				"status"	   => "Success",
				"message"	   => "Log In Success. Redirecting...."
			));

	        Audit_Trail::create_log($result->id, 'Logged In', $conn);
		} else {
			array_push($status, array(
				"status"	   => "Failure",
				"message"	   => "Invalid Login Credentials"
			));
		}

		array_push($response, array(
			"user"   => $user,
			"status" => $status
		));
	} else {
		array_push($status, array(
			"status"	   => "Failure",
			"message"	   => "Log In Paramenters Missing. Please Try Again...."
		));

		array_push($response, array(
			"user"   => $user,
			"status" => $status
		));
	}

    $pdo->close();
    echo json_encode($response);
?>