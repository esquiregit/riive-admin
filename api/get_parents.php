<?php
    header('Content-Type: application/json');
    require "classes/parent.php";

    $conn     = $pdo->open();
    $response = array();
    $result   = Parents::read_parents($conn);

    foreach ($result as $row) {
        array_push($response, array(
            "email"        => strtolower($row->email),
            "class"        => strtoupper($row->class),
            "parent"       => Methods::strtocapital($row->fullname),
            "location"     => Methods::strtocapital($row->location),
            "occupation"   => Methods::strtocapital($row->occupation),
            "phone"        => $row->phone,
            "relation"     => Methods::strtocapital($row->relation),
            "status"       => Methods::strtocapital($row->status),
            "schoolname"   => $row->schoolname,
            'country_name' => $row->country_name,
            "student"      => ucwords($row->othernames ? $row->firstname.' '.$row->othernames.' '.$row->lastname : $row->firstname.' '.$row->lastname),
        ));
    }

    $pdo->close();
    echo json_encode($response);
?>