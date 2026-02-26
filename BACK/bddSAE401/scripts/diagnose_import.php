<?php
// Diagnostic script to replicate header normalization and code formatting
$path = $argv[1] ?? null;
if (!$path || !is_readable($path)) {
    fwrite(STDERR, "Usage: php diagnose_import.php <csv-file>\n");
    exit(2);
}
$separator = ';';
$handle = fopen($path, 'r');
if (!$handle) {
    fwrite(STDERR, "Cannot open file\n");
    exit(2);
}
function normalizeHeader(string $value): string
{
    $value = preg_replace('/^\xEF\xBB\xBF/', '', $value);
    $encoding = mb_detect_encoding($value, ['UTF-8','ISO-8859-1','Windows-1252'], true);
    if ($encoding !== 'UTF-8') {
        $value = mb_convert_encoding($value, 'UTF-8', $encoding);
    }
    $value = trim($value);
    $value = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value);
    $value = strtolower($value);
    $value = str_replace(
        [' ', '-', '%', '(', ')', '/', '*', ',', '€', '²', "'"],
        '_',
        $value
    );
    $value = preg_replace('/_+/', '_', $value);
    return trim($value, '_');
}
function formatCodeDepartement(string $code): ?string
{
    $code = trim($code);
    if ($code === '') return null;
    if (in_array($code, ['2A', '2B'])) return $code;
    if (strlen($code) === 3) return $code;
    return str_pad($code, 2, '0', STR_PAD_LEFT);
}

$header = fgetcsv($handle, 0, $separator);
if ($header === false) { echo "Empty CSV\n"; exit; }
$origHeader = $header;
$header = array_map('normalizeHeader', $header);
echo "Original header:\n";
print_r($origHeader);
echo "Normalized header:\n";
print_r($header);

// mimic the mapping logic from ImportStatistiquesDepartementCommand
$mapped = [];
foreach ($header as $name) {
    if (preg_match('/code.*depart/i', $name)) {
        $mapped[] = 'code_departement';
        continue;
    }
    if (preg_match('/annee/', $name)) {
        $mapped[] = 'annee';
        continue;
    }
    $variants = [
        'nombre_de_logements' => 'nb_logements',
        'nb_logements' => 'nb_logements',
        'taux_de_logements_sociaux_en' => 'taux_logements_sociaux',
        'taux_de_logements_vacants_en' => 'taux_logements_vacants',
    ];
    if (isset($variants[$name])) {
        $mapped[] = $variants[$name];
        continue;
    }
    $mapped[] = $name;
}
echo "Mapped header:\n";
print_r($mapped);
$header = $mapped;

$limit = 20;
$line = 0;
while (($row = fgetcsv($handle, 0, $separator)) !== false && $line < $limit) {
    // skip completely empty rows
    if ($row === [null] || count(array_filter($row)) === 0) {
        echo "Row $line: empty, skipped\n";
        $line++;
        continue;
    }
    if (count($row) !== count($header)) {
        echo "Row $line: column count mismatch (".count($row)." vs ".count($header).")\n";
        print_r($row);
        $line++;
        continue;
    }
    $data = array_combine($header, $row);
    $rawCode = $data['code_departement'] ?? '(missing)';
    $formatted = formatCodeDepartement($rawCode);
    echo "Row $line: raw code='$rawCode' formatted='".($formatted ?? 'NULL')."'"."\n";
    // show a few fields
    $sample = [];
    foreach (['annee_publication','code_departement','nombre_de_logements','nb_logements','nom_departement'] as $k) {
        if (isset($data[$k])) $sample[$k] = $data[$k];
    }
    if ($sample) print_r($sample);
    $line++;
}

fclose($handle);
echo "Done.\n";
