<?php
    require_once '../database.php';

    $postData = file_get_contents('php://input');
    
    if(isset($postData) && !empty($postData)){

        $request = json_decode($postData,true);

        //Validate data not empty
        
        if($request['id'] === '') {
            return http_response_code(404);
        }
        if($request['healthFacility'] === ''){
            return http_response_code(404);
        }
        if($request['vaccinator'] === ''){
            return http_response_code(404);
        }
        if($request['address'] === ''){
            return http_response_code(404);
        }

        //trim data
        $id = trim($request['id']);
        $healthfacility = trim($request['healthFacility']);
        $vaccinator = trim($request['vaccinator']);
        $address = trim($request['address']);

        //Insert Data
        $stmt = $con->prepare("INSERT INTO vaccineadmin VALUES(?,?,?,?)");
        $stmt->execute([null,$healthfacility,$vaccinator,$address]);

        if($stmt){
            $id = $con->lastInsertId();

            $vaccineAdmin = [
                'id' => $id,
                'healthfacility' => $healthfacility,
                'vaccinator' => $vaccinator,
                'address' => $address
            ];
            echo json_encode($vaccineAdmin,JSON_PRETTY_PRINT);
        }else {
            $response = [
                'message' => "Failed to Create Record!"
            ];
        }
    } else {
        echo http_response_code(404);
    }

?>