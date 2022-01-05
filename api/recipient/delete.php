<?php
    require_once '../database.php';

    $idData = $_GET['id'];
    
    if(isset($idData) && !empty($idData)){

        $request = json_decode($idData,true);

        //Validate data not empty
        if (trim($idData) === '' || (int)$idData === 0){
            return http_response_code(404);
        }
        //trim data
        $id = (int)trim($idData);

        //fetch specific data
        try {
            $stmt = $con->prepare("DELETE FROM vaccinerecipient WHERE id=?");
            $stmt->execute([$id]);

            if ($stmt){
                $response = [
                    "message" => "Sucessfully Deleted"
                ];
                http_response_code(200);
                echo json_encode($response,JSON_PRETTY_PRINT);
    
            }else {
                echo http_response_code(404);
            }

        }catch(PDOException $err){
            http_response_code(404);
            echo 'Error: '.$err->getMessage();
        }
    }
?>