<?php
    header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/security.php";

    $conn     = $pdo->open();
    $response = array();
    $result   = Security::read_securities_info($conn);

    foreach ($result as $row) {
        array_push($response, array(
            "value" => $row->id,
            "label" => ucwords($row->name)
        ));
    }

    $pdo->close();
    echo json_encode($response);
?>
