<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$url = "https://randomuser.me/api/?results=10";

$response = @file_get_contents($url);

if ($response === FALSE) {
    http_response_code(500);
    echo json_encode(["error" => "Error con el API."]);
    exit;
}

$data = json_decode($response, true);

$users = array_map(function ($user) {
    return [
        "nombre" => $user["name"]["first"] . " " . $user["name"]["last"],
        "genero" => $user["gender"],
        "ubicacion" => $user["location"]["city"] . ", " . $user["location"]["country"],
        "correo" => $user["email"],
        "fecha_nacimiento" => date("d/m/Y", strtotime($user["dob"]["date"])),
        "foto" => $user["picture"]["medium"]
    ];
}, $data["results"]);

echo json_encode($users, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
