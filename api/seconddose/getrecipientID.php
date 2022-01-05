<?php
    include_once("../database.php");

    try {
        $stmt = $con->prepare("SELECT id, customid FROM vaccinerecipient WHERE id IN (SELECT recipientid FROM firstdose) ORDER BY id ASC");
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