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
        if($request['vaccineName'] === ''){
            return http_response_code(404);
        }
        if($request['stock'] === ''){
            return http_response_code(404);
        }
        if($request['manufacturer'] === ''){
            return http_response_code(404);
        }
        if($request['efficacyRate'] === ''){
            return http_response_code(404);
        }

        //trim data
        $id = trim($request['id']);
        $vaccinename = trim($request['vaccineName']);
        $stock = trim($request['stock']);
        $manufacturer = trim($request['manufacturer']);
        $efficacyrate = trim($request['efficacyRate']);

        //Query Update
        $stmt = $con->prepare("UPDATE vaccine SET vaccinename = ?, stock = ?, manufacturer = ?,
                                    efficacyrate = ? WHERE id = ?");
        $stmt->execute([$vaccinename,$stock,$manufacturer,$efficacyrate,$id]);
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