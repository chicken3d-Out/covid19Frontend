<?php
    include_once("../database.php");

    try {
        $stmt = $con->prepare("SELECT firstdose.id as fdID, vaccinerecipient.id as vrID, 
                            vaccinerecipient.customid, vaccinerecipient.firstname, vaccinerecipient.lastname, 
                            vaccinerecipient.category, vaccinerecipient.gender, vaccine.id as vID, vaccine.vaccineName, 
                            vaccineadmin.id as vaID, vaccineadmin.healthFacility, date FROM vaccinerecipient, vaccine, 
                            vaccineadmin, firstdose WHERE vaccinerecipient.id = firstdose.recipientid AND 
                            vaccine.id = firstdose.vaccineid AND vaccineadmin.id = firstdose.vaccineadminid ORDER BY date ASC");  
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