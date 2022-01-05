<?php
    include_once("../database.php");

    try {
        $stmt = $con->prepare("SELECT id, customid, firstname, middlename, lastname, category, contactnum, email, address, 
                            floor(DATEDIFF(CURDATE(),birthday)/365) AS age, gender from vaccinerecipient");
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($results){
            echo json_encode($results,JSON_PRETTY_PRINT);

        }else {
            $error = [
                "message" => "Query Error",
                "status" => "404 Not Found"
            ];
            echo json_encode($error,JSON_PRETTY_PRINT);
        }
    } catch (PDOException $err){
        echo 'Query Error'.$err->getMessage();
    }
?>