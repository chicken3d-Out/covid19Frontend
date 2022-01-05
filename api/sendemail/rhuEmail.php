<?php
    require_once '../database.php';
    require_once './src/PHPMailer.php';
    require_once './src/SMTP.php';
    require_once './src/Exception.php';
    
    $postData = file_get_contents('php://input');
    
    if(isset($postData) && !empty($postData)){

        $request = json_decode($postData,true);

        //Validate data not empty
        
        if($request['id'] === '') {
            return http_response_code(404);
        }
        
        if($request['status'] === ''){
            return http_response_code(404);
        }
        
    }
        //trim data
        $id = trim($request['id']);
        $status = trim($request['status']);
        
        $firstname = trim($request['firstname']);
        $lastname = trim($request['lastname']);
        $email = trim($request['email']);
        
        
    //Recipient
    $mailTo = $email;
    //body Message
    $body = "<h2 style='font-family:Arial; color:#black; text-shadow: 2px 2px 4px #eee;'>Hello ".$firstname." ".$lastname."!</h2><br>
        <b style='font-family:Arial;'>This is to Inform you that your reservation has been set.</b><br>
        <br>
        <br>
        <hr>
        <br>
        <br>
        <p style='font-family:Arial;'>Kindly Go to the nearest Rural Health Vaccination Center in your area.</p>

        <p style='font-family:Arial;'>Visit the Rural Health Unit Page <a href=''>here</a>.</p>

        <p style='font-family: Arial;'>Truly Yours,</p>

        <p style='font-family: Arial'><b>Rural Health Unit Team</b></p>
        <br>
        <p style='font-family: Arial'>This is an auto generated email. Do not replt to this message.</p>       
    "; 
    //instantiate PHPMailer
    $email = new PHPMailer\PHPMailer\PHPmailer();

    $email->SMPTPDebug = 3;

    $email->isSMTP();
    //Set Host name smtp
    $email->Host = "smtp-relay.sendinblue.com";
    //enable password
    $email->SMTPAuth = true;
    //set username
    $email->Username = "vincent.ontuca@evsu.edu.ph";
    //set password
    $email->Password = "Pq3UNQymsTBX1Arv";
    //for encryption of password
    $email->SMTPSecure = "tls";
    //SMPTP Port
    $email->Port = "587";
    //SET EMAIL Sender
    $email->From = "vincent.ontuca@evsu.edu.ph";
    //Set Sender Name
    $email->FromName = "Rural Health Unit";
    //Set Where to send and set Reciever's name
    $email->addAddress($mailTo, "Vaccine Recipient");
    //enable HTML tag in the body
    $email->isHTML = true;
    //Set Email Subject
    $email->Subject = "Rural Health Unit: Your Reservation has been set";
    //set body
    $email->Body = $body;
    //Set default if html not loaded
    $email->AltBody = "Your reservation has been set!";
    if($email->send()){
        echo "Success!";
    }else {
        echo "Failed!";
    }
    if(!$email->send()){
        $sendingStatus = [
            'message' => "Failed",
            'status' => "404"
        ];
        echo json_encode($sendingStatus,JSON_PRETTY_PRINT);
    }else {
        //Update Status to Sent
        
        $stmt = $con->prepare("UPDATE reservations set status = ? WHERE id = ?");
        $upstat = 'Sent';
        $stmt->execute([$upstat,$id]);

        if ($stmt){
            $sendingStatus = [
                'message' => "Success",
                'status' => "200"
            ];
        echo json_encode($sendingStatus,JSON_PRETTY_PRINT);
        }
        
    }
?>