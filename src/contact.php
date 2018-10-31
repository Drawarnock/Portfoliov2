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
                echo "<i class='ion-ios-close-circle-outline'></i>";
                if(empty($name)) { 
                    echo "<p class='modal__message'>Field with name is empty!</p>";
                }
                if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    echo "<p class='modal__message'>Incorrect E-mail format!</p>";
                }
                if(empty($message)) { 
                    echo "<p class='modal__message'>Field with message is empty!</p>";
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
                echo "<i class='ion-ios-checkmark-circle-outline'></i><p class='modal__message'>Thank you! 
                 Your message has been successfully sent. I will try to reply as fast as I can.</p>";
            } else {
                http_response_code(500);
                echo "<i class='ion-ios-close-circle-outline'></i><p class='modal__message'>Something went wrong! Your message hasn't been sent.</p>";
            }
    
        } else {
            http_response_code(403);
            echo "<i class='ion-ios-close-circle-outline'><p class='modal__message'>Something went wrong! Your message hasn't been sent.</p>";
        }
    }
       
?>