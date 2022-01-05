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

        //Query Update
        $stmt = $con->prepare("UPDATE vaccineadmin SET healthfacility = ?, vaccinator = ?, address = ? WHERE id = ?");
        $stmt->execute([$healthfacility,$vaccinator,$address,$id]);
        if($stmt){
            $response = [
                'status' => 200,
                'message' => "Successfully Updated!"
            ];
            echo json_encode($response,JSON_PRETTY_PRINT);
        }else {
            $response = [
                'status' => 404,
                'message' => "Failed to Update Record!"
            ];
        }
    }else {
        http_response_code(400);
    }

?>