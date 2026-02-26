<?php
$names = ['code_d_epartement', 'codedepartement'];
foreach ($names as $name) {
    $clean = preg_replace('/[^a-z0-9]/', '', $name);
    echo "name=$name clean=$clean";
    if (preg_match('/^code.*depart/i', $clean)) {
        echo " MATCH";
    }
    echo "\n";
}
