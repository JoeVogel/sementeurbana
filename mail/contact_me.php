<?php

// Check for empty fields
if(empty($_POST['name']) || empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));

// Create the email and send the message
$to = "contato@sementeurbana.com";
$subject = "Novo contato recebido:  $name";
$body = "Você recebeu uma nova mensagem do site Semente Urbana.\n\n"."Estes são os detalhes do contato:\n\Nome: $name\n\nE-mail: $email";
$header = "From: site@sementeurbana.com\n";
$header .= "Reply-To: $email";	

if(!mail($to, $subject, $body, $header))
  http_response_code(500);
?>
