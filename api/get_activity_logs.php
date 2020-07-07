<?php
    header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/audit_trail.php";

    $conn     = $pdo->open();
    $response = array();
    $result   = Audit_Trail::read_logs($conn);

        foreach ($result as $log) {
            if($log->firstname) {
                $name = $log->firstname.' '.$log->lastname;
            } else {
                if($log->school_id && $log->teacher_id) {
                    $name = $log->name;
                } else {
                    $name = $log->schoolname;
                }
            }
            if($log->access_level) {
                $access_level = $log->access_level;
            } else {
                if($log->teacher_id) {
                    $access_level = 'Teacher';
                } else {
                    $access_level = 'School';
                }
            }
            array_push($response, array(
                "name"         => $name,
                "access_level" => $access_level,
                "activity"     => $log->activity,
                "date"         => date_format(date_create($log->date), 'l d F Y \a\t H:i:s'),
            ));
        }

    $pdo->close();
    echo json_encode($response);
?>
