<?php
    header('Content-Type: application/json');
    require "classes/attendance.php";

    $conn       = $pdo->open();
    $data       = file_get_contents("php://input");
    $request    = json_decode($data);//die(print_r($request));
    $class      = Methods::validate_string($request->class);
    $school_id  = Methods::validate_string($request->school_id);
    $teacher_id = Methods::validate_string($request->teacher_id);
    $response   = array();
    Attendance::after_nine_attedance_marking($school_id, $conn);

    if($school_id && $teacher_id && $class) {
        $result = Student::read_assessment_students_by_class($school_id, $class, $conn);

        foreach ($result as $row) {
            array_push($response, array(
                "studentid" => $row->studentid,
                "student"   => Methods::strtocapital($row->othernames ? $row->firstname.' '.$row->othernames.' '.$row->lastname : $row->firstname.' '.$row->lastname),
            ));
        }
    } else {
        $class = ($class == 1 || $class == 2 || $class == 3 || $class == 4 || $class == 5 || $class == 6) ? 'Class ' . $class : $class;
        array_push($response, array(
            "status"  => "Error",
            "message" => "Couldn't Fetch $class Students",
        ));
    }

    $pdo->close();
    echo json_encode($response);
?>