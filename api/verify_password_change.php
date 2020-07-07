<?php
    header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/methods.php";

    $conn       = $pdo->open();
    $data       = file_get_contents("php://input");
    $request    = json_decode($data);//die(print_r($request));
    $user_id    = Methods::validate_string($request->i);
    $school_id  = Methods::validate_string($request->s);
    $type       = Methods::validate_string($request->t);
    $reset_code = Methods::validate_string($request->c);
    $response   = array();

    if($user_id && $reset_code && $type && $school_id) {
        $result = Methods::verify_password_change($user_id, $type, $reset_code, $conn);

        if($result) {
            array_push($response, array(
                "status"  => "Success",
                "message" => "Proceed With Password Changed...."
            ));
        } else {
            array_push($response, array(
                "status"  => "Error",
                "message" => "Couldn't Update Password. Please Try Again...."
            ));
        }
    }

    $pdo->close();
    echo json_encode($response);
?>
