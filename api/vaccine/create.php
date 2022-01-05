<?php
    require_once '../database.php';

    $postData = file_get_contents('php://input');
    
    if(isset($postData) && !empty($postData)){

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

        //Insert Data
        $stmt = $con->prepare("INSERT INTO vaccine VALUES(?,?,?,?,?)");
        $stmt->execute([null,$vaccinename,$stock,$manufacturer,$efficacyrate]);

        if($stmt){
            $id = $con->lastInsertId();

            $vaccineRecipient = [
                'id' => $id,
                'vaccineName' => $vaccinename,
                'stock' => $stock,
                'manufacturer' => $manufacturer,
                'efficacyRate' => $efficacyrate,
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