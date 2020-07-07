<?php
    header('Content-Type: application/json');
    require "classes/conn.php";

    $conn     = $pdo->open();
    $response = array();
    $query    = $conn->prepare('SELECT p.id, p.schoolCode, p.pickUpPerson, p.pickUpType, p.phone, p.code, p.student_id, p.date, p.imagePath, p.image, p.sentBy, st.firstname, st.othernames, st.lastname, st.class, pa.fullname, sc.schoolname, co.country_name FROM pickup p INNER JOIN student st ON p.student_id = st.studentid INNER JOIN parent pa ON p.sentBy = pa.parentid INNER JOIN school sc On p.schoolCode = sc.School_id INNER JOIN countries co ON sc.country = co.id ORDER BY p.date desc, sc.schoolname, st.firstname, p.pickUpPerson, st.firstname');
    $query->execute();
    $result   = $query->fetchAll(PDO::FETCH_OBJ);

    foreach ($result as $row) {
        array_push($response, array(
            "class"        => strtoupper($row->class),
            "code"         => $row->code,
            "date"         => date_format(date_create($row->date), 'l d F Y \a\t H:i:s'),
            "parent"       => ucwords($row->fullname),
            "image"        => $row->image,
            "imagePath"    => $row->imagePath,
            "phone"        => $row->phone,
            "pickUpPerson" => ucwords($row->pickUpPerson),
            "pickUpType"   => ucwords($row->pickUpType),
            'schoolname'   => $row->schoolname,
            'country_name' => $row->country_name,
            "student"      => ucwords($row->othernames ? $row->firstname.' '.$row->othernames.' '.$row->lastname : $row->firstname.' '.$row->lastname),
        ));
    }

    $pdo->close();
    echo json_encode($response);
?>
