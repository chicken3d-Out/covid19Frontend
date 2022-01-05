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
        if($request['username'] === ''){
            return http_response_code(404);
        }
        if($request['password'] === ''){
            return http_response_code(404);
        }
        if($request['date'] === ''){
            return http_response_code(404);
        }

        //trim data
        $id = trim($request['id']);
        $firstname = trim($request['firstname']);
        $lastname = trim($request['lastname']);
        $username = trim($request['username']);
        $password = trim($request['password']);
        $date = trim($request['date']);

        //Insert Data
        $stmt = $con->prepare("INSERT INTO adminuser VALUES(?,?,?,?,?,?)");
        $stmt->execute([null,$username,$password,$firstname,$lastname,null]);

        if($stmt){
            $id = $con->lastInsertId();

            $addAdmin = [
                'id' => $id,
                'username' => $username,
                'password' => $password,
                'firstname' => $firstname,
                'lastname' => $lastname,
                'dateCreated' => $date
            ];
            echo json_encode($addAdmin,JSON_PRETTY_PRINT);
        }else {
            $response = [
                'message' => "Failed to Create Record!"
            ];
        }
    } else {
        echo http_response_code(404);
    }

?>