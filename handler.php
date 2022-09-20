<?php

function targetHit($x, $y, $r): bool
{
    return checkTriangle($x, $y, $r) || checkRectangle($x, $y, $r) || checkCircle($x, $y, $r);
}

function checkCircle($x, $y, $r): bool
{
    if ($x <= 0 && $x >= (- $r)){
        return $y <= 0 && (pow($x, 2) + pow($y, 2) <= pow($r, 2));
    }
    return false;
}

function checkRectangle($x, $y, $r): bool
{
    return $x <= 0 && $x >= (-$r / 2) && $y >= 0 && $y <= $r;
}

function checkTriangle($x, $y, $r): bool
{
    if($x <= $r && $x >= 0 && $y <= $r && $y >= 0){
        return $y <= $r - $x;
    }
    return false;
}

if(isset($_POST["R"])){
    $start = microtime(true);
    $r = $_POST["R"];
    $x = $_POST["X"];
    $y = $_POST["Y"];
    $result = targetHit($x, $y, $r);

    echo json_encode(array(
        "x" => $x,
        "y" => $y,
        "r" => $r,
        "result" => $result,
        "date" => (new DateTime('now'))->format('Y-m-d H:i:s'),
        "time" => microtime(true) - $start
    ));
}




