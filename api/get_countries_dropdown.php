<?php
    header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/country.php";

    $conn      = $pdo->open();
    $response  = array();
    $countries = Country::read_countries_dropdown($conn);

    if($countries) {
        foreach ($countries as $country) {
            array_push($response, array(
                "label" => $country->country_name,
                "value" => $country->id,
                "code"  => $country->country_code
            ));
        }
    } else {
        array_push($response, array(
            "status"  => "Failed",
            "message" => "Couldn't Fetch Countries. Please Try Again...."
        ));
    }

    $pdo->close();
    echo json_encode($response);
?>