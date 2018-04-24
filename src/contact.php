<?php

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = (trim($_POST["message"]));

        if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            
            // echo "<i class='icon-cancel-circled'></i><br>";
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

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "wislockik23@gmail.com";

        // Set the email subject.
        $subject = "New contact from $name";

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "<i class='icon-ok-circled'></i><p class='contact__message'>Dziękuję! Twoja wiadomość została wysłana postaram się odpowiedzieć jak najszybciej :)</p>";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "<i class='icon-cancel-circled'></i><p class='contact__message'>Coś poszło nie tak, twoja wiadomość nie została wysłana!</p>";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "<i class='icon-cancel-circled'></i><p class='contact__message'>Coś poszło nie tak, twoja wiadomość nie została wysłana!</p>";
    }
?>