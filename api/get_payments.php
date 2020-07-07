<?php
	header('Content-Type: application/json');
    require "classes/conn.php";
    require "classes/payment.php";

    $conn     = $pdo->open();
	$response = array();
	$result   = Payment::read_payments($conn);

	foreach ($result as $payment) {
		array_push($response, array(
			"id"    	           => $payment->id,
			"Fee"                  => 'GHS '.number_format($payment->Fee, 2),
			"Purpose"              => ucwords($payment->Purpose),
			"ParentId"   	       => $payment->ParentId,
			"fullname"             => ucwords($payment->fullname),
			"StartDate"            => $payment->StartDate,
			"InvoiceToken"         => $payment->InvoiceToken,
			"LicenceOrPin"         => $payment->LicenceOrPin,
			"MobileNumber"         => $payment->MobileNumber,
			"TransactionId"        => $payment->TransactionId,
			"AmountAfterFees"      => 'GHS '.number_format($payment->AmountAfterFees, 2),
			"ClientReference"      => $payment->ClientReference,
			"LastPaymentDate"      => $payment->LastPaymentDate == '0000-00-00 00:00:00' || empty($payment->LastPaymentDate) ? 'No Payment Made Yet' : date_format(date_create($payment->LastPaymentDate), 'l d F Y \a\t H:i:s'),
			"NextPaymentDate"      => $payment->NextPaymentDate == '0000-00-00 00:00:00' || empty($payment->NextPaymentDate) ? 'Not Yet' : date_format(date_create($payment->NextPaymentDate), 'l d F Y \a\t H:i:s'),
			"TransactionAmount"    => 'GHS '.number_format($payment->TransactionAmount, 2),
			"TransactionStatus"    => ucwords($payment->TransactionStatus),
			"MobileChannelName"    => ucwords($payment->MobileChannelName),
			"NetworkTransactionId" => $payment->NetworkTransactionId,
		));
	}

	$pdo->close();
    echo json_encode($response);
?>
