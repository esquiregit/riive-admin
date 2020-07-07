<?php
    header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/methods.php";
    require "classes/security.php";

    $conn        = $pdo->open();
    $data        = file_get_contents("php://input");
    $request     = json_decode($data);//die(print_r($request));
    $security_id = Methods::validate_string($request->security_id);
    $response    = array();

    if($security_id) {
        $result = Security::read_security_person_approvals($security_id, $conn);

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
    }

    $pdo->close();
    echo json_encode($response);
?>
