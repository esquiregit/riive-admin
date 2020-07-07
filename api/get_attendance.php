<?php
    header('Content-Type: application/json');
    require "classes/conn.php";

    $conn     = $pdo->open();
    $response = array();
    $query    = $conn->prepare('SELECT att.status, att.clock_in_time, att.clock_out_time, att.date, att.pickUpCode, sc.schoolname, st.firstname, st.othernames, st.lastname, st.class, st.imagePath, st.image, co.country_name FROM attendance att INNER JOIN student st ON att.student_id = st.studentid INNER JOIN school sc ON att.schoolCode = sc.School_id INNER JOIN countries co ON sc.country = co.id ORDER BY att.date desc, sc.schoolname, st.firstname');
    $query->execute();
    $result   = $query->fetchAll(PDO::FETCH_OBJ);

    foreach ($result as $row) {
        array_push($response, array(
            "status"         => $row->status,
            "clock_in_time"  => $row->clock_in_time === '00:00:00' ? '--:--:--' : $row->clock_in_time,
            "clock_out_time" => $row->clock_out_time === '00:00:00' ? '--:--:--' : $row->clock_out_time,
            "class"          => strtoupper($row->class),
            "date"           => date_format(date_create($row->date), 'l d F Y'),
            "pickUpCode"     => $row->pickUpCode,
            "image"          => $row->image,
            "imagePath"      => $row->imagePath,
            'schoolname'     => $row->schoolname,
            'country_name'   => $row->country_name,
            "student"        => ucwords($row->othernames ? $row->firstname.' '.$row->othernames.' '.$row->lastname : $row->firstname.' '.$row->lastname),
        ));
    }

    $pdo->close();
    echo json_encode($response);
?>
