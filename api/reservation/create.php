<?php
    require_once '../database.php';

    $postData = file_get_contents('php://input');
    
    if(isset($postData) && !empty($postData)){

        $request = json_decode($postData,true);

        //Validate data not empty
        
        if($request['id'] === '') {
            return http_response_code(404);
        }
        if($request['firstname'] === ''){
            return http_response_code(404);
        }
        if($request['lastname'] === ''){
            return http_response_code(404);
        }
        if($request['email'] === ''){
            return http_response_code(404);
        }
        if($request['status'] === ''){
            return http_response_code(404);
        }

        //trim data
        $id = trim($request['id']);
        $firstname = trim($request['firstname']);
        $lastname = trim($request['lastname']);
        $email = trim($request['email']);
        $status = trim($request['status']);

        //Insert Data
        $stmt = $con->prepare("INSERT INTO reservations VALUES(?,?,?,?,?)");
        $stmt->execute([null,$firstname,$lastname,$email,$status]);

        if($stmt){
            $id = $con->lastInsertId();

            $vaccineRecipient = [
                'id' => $id,
                'firstname' => $firstname,
                'lastname' => $lastname,
                'email' => $email,
                'status' => $status,
            ];
            echo json_encode($vaccineRecipient,JSON_PRETTY_PRINT);
        }else {
            $response = [
                'message' => "Failed to Create Record!"
            ];
        }
    } else {
        echo http_response_code(404);
    }

?>