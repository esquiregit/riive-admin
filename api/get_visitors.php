<?php
    header('Content-Type: application/json');
    require "classes/conn.php";

    $conn     = $pdo->open();
    $response = array();
    $query    = $conn->prepare('SELECT v.visitorName, v.visitorNumber, v.personToVisit, v.securityPersonId, v.clockInTime, v.clockOutTime, v.purposeOfVisit, v.imagePath, v.image, sec.name, sc.schoolname, co.country_name FROM visitor v INNER JOIN security sec ON v.securityPersonId = sec.id INNER JOIN school sc ON v.schoolID = sc.School_id INNER JOIN countries co ON sc.country = co.id');
    $query->execute();
    $result   = $query->fetchAll(PDO::FETCH_OBJ);

    foreach ($result as $row) {
        array_push($response, array(
            "clockInTime"      => $row->clockInTime  === '0000-00-00 00:00:00' ? 'Not Yet' : date_format(date_create($row->clockInTime), 'l d F Y \a\t H:m:s'),
            "clockOutTime"     => $row->clockOutTime === '0000-00-00 00:00:00' ? 'Not Yet' : date_format(date_create($row->clockOutTime), 'l d F Y \a\t H:m:s'),
            "image"            => $row->image,
            "imagePath"        => $row->imagePath,
            "name"             => ucwords($row->name),
            "personToVisit"    => ucwords($row->personToVisit),
            "purposeOfVisit"   => ucwords($row->purposeOfVisit),
            "securityPersonId" => $row->securityPersonId,
            "visitorName"      => ucwords($row->visitorName),
            "visitorNumber"    => $row->visitorNumber,
            'schoolname'       => $row->schoolname,
            'country_name'     => $row->country_name,
        ));
    }

    $pdo->close();
    echo json_encode($response);
?>
