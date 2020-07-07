<?php
    header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/security.php";

    $conn     = $pdo->open();
    $response = array();
    $result   = Security::read_securities($conn);

    foreach ($result as $row) {
        array_push($response, array(
            "name"         => ucwords($row->name),
            "contact"      => $row->contact,
            "schoolname"   => ucwords($row->schoolname),
            "country_name" => ucwords($row->country_name),
            "accountType"  => ucwords($row->accountType)
        ));
    }

    $pdo->close();
    echo json_encode($response);
?>
