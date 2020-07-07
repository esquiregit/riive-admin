<?php
    header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/country.php";
    require "classes/methods.php";

    $conn      = $pdo->open();
    $data      = file_get_contents("php://input");
    $request   = json_decode($data);//die(print_r($request));
    $countryID = Methods::validate_string($request->countryID);
    $response  = array();

    if($countryID) {
        $result = Country::read_regions_by_country($countryID, $conn);
        
        foreach ($result as $row) {
            array_push($response, array(
                "label" => ucwords($row->regionName),
                "value" => $row->regionID,
            ));
        }
    } else {
        array_push($response, array(
            "status"  => "Failed",
            "message" => "Couldn't Fetch Regions. Please Try Again...."
        ));
    }

    $pdo->close();
    echo json_encode($response);
?>
