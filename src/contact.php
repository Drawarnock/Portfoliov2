<?php
    if(!isset($_POST['name'])) {
        header("Location: index.html");
        exit;
    } else {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $name = strip_tags(trim($_POST["name"]));
                    $name = str_replace(array("\r","\n"),array(" "," "),$name);
            $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
            $message = (trim($_POST["message"]));
    
            if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                
                if(empty($name)) { 
                    echo "<p class='contact__message'>Pole z imieniem i nazwiskiem jest puste!</p>";
                }
                if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    echo "<p class='contact__message'>Niepoprawny format adresu e-mail!</p>";
                }
                if(empty($message)) { 
                    echo "<p class='contact__message'>Pole z z wiadomością nie może być puste!</p>";
                }
                exit;
            }
    
            $recipient = "wislockik23@gmail.com";
            $subject = "New contact from $name";
            $email_content = "Name: $name\n";
            $email_content .= "Email: $email\n\n";
            $email_content .= "Message:\n$message\n";
            $email_headers = "From: $name <$email>";
    
            if (mail($recipient, $subject, $email_content, $email_headers)) {
                http_response_code(200);
                echo "<i class='icon-ok-circled'></i><p class='contact__message'>Dziękuję! Twoja wiadomość została wysłana postaram się odpowiedzieć jak najszybciej :)</p>";
            } else {
                http_response_code(500);
                echo "<i class='icon-cancel-circled'></i><p class='contact__message'>Coś poszło nie tak, twoja wiadomość nie została wysłana!</p>";
            }
    
        } else {
            http_response_code(403);
            echo "<i class='icon-cancel-circled'></i><p class='contact__message'>Coś poszło nie tak, twoja wiadomość nie została wysłana!</p>";
        }
    }
       
?>