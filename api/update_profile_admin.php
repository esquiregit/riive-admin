<?php
	header('Content-Type: application/json');
	require "classes/conn.php";
    require 'classes/admin.php';
	require "classes/audit_trail.php";
    require 'classes/methods.php';

	$conn     	      = $pdo->open();
	$response         = array();
	$admin   	      = Methods::validate_string(Methods::strtocapital($_POST['id']));
	$firstname   	  = Methods::validate_string(Methods::strtocapital($_POST['f']));
	$lastname   	  = Methods::validate_string(Methods::strtocapital($_POST['l']));
	$email   	      = Methods::validate_email(strtolower($_POST['ea']));
	$username         = Methods::validate_string($_POST['u']);
	$password         = Methods::validate_string($_POST['p']);
	$confirm_password = Methods::validate_string($_POST['cp']);
	$access_level     = Methods::validate_string($_POST['al']);
	@$profile_picture = Methods::validate_string($_FILES['image']['name']);
    @$image_size   	  = Methods::validate_string($_FILES['image']['size']);
    @$image_type   	  = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

	if(!isset($admin) || !isset($firstname) || !isset($lastname) || !isset($email) || !isset($username) || !isset($access_level)) {
		array_push($response, array(
			"status"  => "Error",
			"message" => "Couldn't Update Profile. Please Try Again...."
		));
	} else {
		if(empty($firstname)) {
			array_push($response, array(
				"status"  => "Warning",
				"message" => "Please Fill In Your First Name...."
			));
		} else if(empty($lastname)) {
			array_push($response, array(
				"status"  => "Warning",
				"message" => "Please Fill In Your Last Name...."
			));
		} else if(empty($email)) {
			array_push($response, array(
				"status"  => "Warning",
				"message" => "Please Fill In Your Email Address...."
			));
		} else if(!Methods::valid_email_format($email)) {
			array_push($response, array(
				"status"  => "Warning",
				"message" => "Invalid Email Address Format...."
			));
		} else if(Methods::is_this_email_address_taken($admin, $email, $conn)) {
			array_push($response, array(
				"status"  => "Warning",
				"message" => "Email Address \"" . $email . "\" Already Used. Please Choose Another...."
			));
		} else if(empty($username)) {
			array_push($response, array(
				"status"  => "Warning",
				"message" => "Please Fill In Your Username...."
			));
		} else if(Methods::is_this_username_taken($admin, $username, $conn)) {
			array_push($response, array(
				"status"  => "Warning",
				"message" => "Username\"".$username."\" Already Used. Please Choose Another...."
			));
		} else if(!empty($profile_picture) && $image_size > (1048576)) {
			array_push($response, array(
				"status"  => "Warning",
				"message" => "Image Size Must Be 1mb Or Less"
			));
		} else if(!empty($profile_picture) && strtolower($image_type) != 'png' && strtolower($image_type) != 'jpeg' && strtolower($image_type) != 'jpg' ) {
			array_push($response, array(
				"status"  => "Warning",
				"message" => "Image Must Be PNG Or JPG/JPEG"
			));
		} else if(!empty($password) && strlen($password) < 8) {
			array_push($response, array(
				"status"  => "Warning",
				"message" => "Password Must Contain At Least 8 Characters...."
			));
		} else if(!empty($password) && !empty($confirm_password) && $password !== $confirm_password) {
			array_push($response, array(
				"status"  => "Warning",
				"message" => "Passwords Don't Match...."
			));
		} else {
			if(empty($profile_picture)) {
				if(empty($password)) {
					if(Admin::update_admin_with_no_password_and_no_image($username, $firstname, $lastname, $email, $admin, $conn)) {
						array_push($response, array(
							"user"    => Admin::read_admin_after_profile_update($admin, $conn),
							"status"  => "Success",
							"message" => "Profile Updated Successfully...."
						));
	        			Audit_Trail::create_log($admin, 'Updated Profile Details', $conn);
					} else {
						array_push($response, array(
							"status"  => "Error",
							"message" => "Profile Could Not Be Updated. Please Try Again...."
						));
	        			Audit_Trail::create_log($admin, 'Tried To Update Profile Details', $conn);
					}
				} else {
					if(Admin::update_admin_with_password_and_no_image($username, $password, $firstname, $lastname, $email, $admin, $conn)) {
						array_push($response, array(
							"user"    => Admin::read_admin_after_profile_update($admin, $conn),
							"status"  => "Success",
							"message" => "Profile Updated Successfully...."
						));
	        			Audit_Trail::create_log($admin, 'Updated Profile Details', $conn);
					} else {
						array_push($response, array(
							"status"  => "Error",
							"message" => "Profile Could Not Be Updated. Please Try Again...."
						));
	        			Audit_Trail::create_log($admin, 'Tried To Update Profile Details', $conn);
					}
				}
			} else  {
				$picture_upload = $firstname.'_'.$lastname.'_'.Date('Y_m_d_H_i_s').'_'.rand(100, 999).'.'.$image_type;
				if(empty($password)) {
					if(Admin::update_admin_with_no_password_and_image($username, $firstname, $lastname, $email, 'pictures/'.$picture_upload, $admin, $conn)) {
						move_uploaded_file($_FILES["image"]["tmp_name"], 'pictures/'.$picture_upload);
						array_push($response, array(
							"user"    => Admin::read_admin_after_profile_update($admin, $conn),
							"status"  => "Success",
							"message" => "Profile Updated Successfully...."
						));
	        			Audit_Trail::create_log($admin, 'Updated Profile Details', $conn);
					} else {
						array_push($response, array(
							"status"  => "Error",
							"message" => "Profile Could Not Be Updated. Please Try Again...."
						));
	        			Audit_Trail::create_log($admin, 'Tried To Update Profile Details', $conn);
					}
				} else {
					if(Admin::update_admin_with_password_and_image($username, $password, $firstname, $lastname, $email, 'pictures/'.$picture_upload, $admin, $conn)) {
						move_uploaded_file($_FILES["image"]["tmp_name"], 'pictures/'.$picture_upload);
						array_push($response, array(
							"user"    => Admin::read_admin_after_profile_update($admin, $conn),
							"status"  => "Success",
							"message" => "Profile Updated Successfully...."
						));
	        			Audit_Trail::create_log($admin, 'Updated Profile Details', $conn);
					} else {
						array_push($response, array(
							"status"  => "Error",
							"message" => "Profile Could Not Be Updated. Please Try Again...."
						));
	        			Audit_Trail::create_log($admin, 'Tried To Update Profile Details', $conn);
					}
				}
			}
	    }

	    $pdo->close();
	}
	echo json_encode($response);
?>