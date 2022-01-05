<?php
    require_once '../database.php';

    $postData = file_get_contents('php://input');
    if(isset($postData) && !empty($postData)){
        //get request data
        $request = json_decode($postData,true);

        //Validate data not empty
        if($request['fdID'] === '') {
            return http_response_code(404);
        }
        if($request['vrID'] === ''){
            return http_response_code(404);
        }
        if($request['vID'] === ''){
            return http_response_code(404);
        }
        if($request['vaID'] === ''){
            return http_response_code(404);
        }

        //trim data
        $fdID = trim($request['fdID']);
        $vrID = trim($request['vrID']);
        $vID = trim($request['vID']);
        $vaID = trim($request['vaID']);
        $date = trim($request['date']);

        //Query Update
        $stmt = $con->prepare("UPDATE firstdose SET recipientid = ?, vaccineid = ?, vaccineadminid = ? WHERE id = ?");
        $stmt->execute([$vrID,$vID,$vaID,$fdID]);
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