<?php
    require_once '../database.php';

    $postData = file_get_contents('php://input');
    if(isset($postData) && !empty($postData)){
        //get request data
        $request = json_decode($postData,true);

        //Validate data not empty
        if($request['id'] === '') {
            return http_response_code(404);
        }
        if($request['firstname'] === ''){
            return http_response_code(404);
        }
        if($request['middlename'] === ''){
            return http_response_code(404);
        }
        if($request['lastname'] === ''){
            return http_response_code(404);
        }
        if($request['category'] === ''){
            return http_response_code(404);
        }
        if($request['contactnum'] === ''){
            return http_response_code(404);
        }
        if($request['email'] === ''){
            return http_response_code(404);
        }
        if($request['address'] === ''){
            return http_response_code(404);
        }
        if($request['birthday'] === ''){
            return http_response_code(404);
        }

        //trim data
        $id = trim($request['id']);
        $firstname = trim($request['firstname']);
        $middlename = trim($request['middlename']);
        $lastname = trim($request['lastname']);
        $category = trim($request['category']);
        $contactnum = trim($request['contactnum']);
        $email = trim($request['email']);
        $address = trim($request['address']);
        $birthday = trim($request['birthday']);

        //Query Update
        $stmt = $con->prepare("UPDATE vaccinerecipient SET firstname = ?, middlename = ?, lastname =? ,
                                    category = ?, contactnum = ?, email = ?, address = ?, birthday = ? 
                                    WHERE id= ?");
        $stmt->execute([$firstname,$middlename,$lastname,$category,$contactnum,$email,$address,$birthday,$id]);
        if($stmt){
            $response = [
                'status' => 200,
                'message' => "Successfully Updated!"
            ];
            echo json_encode($response,JSON_PRETTY_PRINT);
        }else {
            http_response_code(400);
        }
    }else {
        http_response_code(400);
    }

?>