<?php

if (isset($_POST['submit'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $myEmail = "rakistazecho7@gmail.com";
    $headers = "From: ".$email;
    $txt = "POGING JAJE!!! You have received an e-mail from ".$name.".\n\n".$message;

    email($myEmail, $txt, $headers);
    header("Location: index.html?salamat");
}