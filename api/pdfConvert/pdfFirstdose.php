<?php
    require '../database.php';
    require_once __DIR__ . './vendor/autoload.php';

    $adminName = $_GET['admin'];
    
    if(isset($adminName) && !empty($adminName)){

        //Set TimeZone to Philippines
        date_default_timezone_set('Asia/Manila');
        //Get Current DateTime
        $date = date('F j, Y g:i:a  ');
        //Declare Variable html to be shown in pdf

        $rowData = "";
        //Query
        $stmt = $con->prepare("SELECT firstdose.id as fdID, vaccinerecipient.id as vrID, vaccinerecipient.customid, 
                                    vaccinerecipient.firstname, vaccinerecipient.lastname, vaccinerecipient.category, vaccinerecipient.gender, 
                                    vaccine.id as vID, vaccine.vaccineName, vaccineadmin.id as vaID, vaccineadmin.healthFacility, 
                                    date FROM vaccinerecipient, vaccine, vaccineadmin, firstdose WHERE vaccinerecipient.id = firstdose.recipientid 
                                    AND vaccine.id = firstdose.vaccineid AND vaccineadmin.id = firstdose.vaccineadminid ORDER BY date ASC");  
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach($results as $key => $row){
            $rowData = $rowData.'
                <tr>
                    <td>'.$row['customid'].'</td>
                    <td>'.$row['firstname'].'</td>
                    <td>'.$row['lastname'].'</td>
                    <td>'.$row['category'].'</td>
                    <td>'.$row['gender'].'</td>
                    <td>'.$row['vaccineName'].'</td>
                    <td>'.$row['healthFacility'].'</td>
                    <td>'.$row['date'].'</td>
                </tr>
            ';
        }

        $html = '
        <link rel="stylesheet" href="./pdf.css">
            <h1>FirstDose Vaccine Recipient Report</h1>
            <table>
                <tr>
                    <td><b>Admin: </b></td>
                    <td>'.$adminName.'</td>
                </tr>
                <tr>
                    <td><b>Date: </b></td>
                    <td>'.$date.'</td>
                </tr>
            </table>
            <table class="vaccinated-table">
                <tr>
                    <td><b>ID</b></td>
                    <td><b>First Name</b></td>
                    <td><b>Last Name</b></td>
                    <td><b>Category</b></td>
                    <td><b>Gender</b></td>
                    <td><b>Vaccine</b></td>
                    <td><b>Health Facility</b></td>
                    <td><b>Date</b></td>
                </tr>
                '.$rowData.'
            </table>
        ';

        //Instantiate Mpdf to variable mpdf
        $mpdf = new \Mpdf\Mpdf();
        //Set Variable MPDF to be shown
        $mpdf->WriteHTML($html);
        //Output the text
        $mpdf->Output("FirstDose Report as of $date.pdf", "D");




    }
    

?>
