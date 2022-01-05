<?php
    //Header
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Content-type: application/json; charset=UTF-8");
    
    $server = "localhost";
    $username = "root";
    $password = "";
    $dbName = "covid19vaccine";

    try {
        $con = new PDO('mysql:host='.$server.';dbname='.$dbName,$username,$password);
        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch (PDOException $err){
        echo "Connection Error:".$err->getMessage();
    }

?>