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
            $stmt = $con->prepare("SELECT * FROM seconddose WHERE id= ?");
            $stmt->execute([$id]);

            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            //echo results in JSON object
            if ($results){
                echo json_encode($results,JSON_PRETTY_PRINT);
    
            }else {
                echo http_response_code(404);
            }

        }catch(PDOException $err){
            http_response_code(404);
            echo 'Error: '.$err->getMessage();
        }
    }
?>