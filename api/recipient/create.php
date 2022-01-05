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
        if($request['gender'] === ''){
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
        $gender = trim($request['gender']);
        $birthday = trim($request['birthday']);

        //Insert Data
        $stmt = $con->prepare("INSERT INTO vaccinerecipient (id, firstname, middlename, lastname, category, contactnum, email,
                                address, gender, birthday) VALUES(?,?,?,?,?,?,?,?,?,?)");
        $stmt->execute([null,$firstname,$middlename,$lastname,$category,$contactnum,$email,$address,$gender,$birthday]);

        //Set the CustomID
        $lastID = $con->lastInsertId();
        $customID = 'RHU-'.$lastID;

        $updateCusId = $con->prepare("UPDATE vaccinerecipient set customid = ? where id = ?");
        $updateCusId->execute([$customID,$lastID]);

        if($stmt && $updateCusId){
            /*$id = $con->lastInsertId();*/

            $vaccineRecipient = [
                'id' => $lastID,
                'customid' => $customID,
                'firstname' => $firstname,
                'middlename' => $middlename,
                'lastname' => $lastname,
                'category' => $category,
                'contactnum' => $contactnum,
                'email' => $email,
                'address' => $address,
                'gender' => $gender,
                'birthday' => $birthday
            ];
            echo json_encode($vaccineRecipient,JSON_PRETTY_PRINT);
        }
    } else {
        echo http_response_code(404);
    }

?>