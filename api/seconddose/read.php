<?php
    include_once("../database.php");

    try {
        $stmt = $con->prepare("SELECT seconddose.id as sdID, vaccinerecipient.id as vrID, vaccinerecipient.customid, 
                                vaccinerecipient.firstname, vaccinerecipient.lastname, vaccinerecipient.category, vaccinerecipient.gender, 
                                vaccine.id as vID, vaccine.vaccineName, vaccineadmin.id as vaID, vaccineadmin.healthFacility, 
                                date FROM vaccinerecipient, vaccine, vaccineadmin, seconddose WHERE vaccinerecipient.id = seconddose.recipientid 
                                AND vaccine.id = seconddose.vaccineid AND vaccineadmin.id = seconddose.vaccineadminid ORDER BY date ASC");  
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