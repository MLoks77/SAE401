<?php


namespace App\Command;


use App\Entity\Departements;
use App\Entity\Population;
use App\Entity\Logements;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;


#[AsCommand(
   name: 'app:import:stats-departement',
   description: 'Import des statistiques département depuis un CSV'
)]
class ImportStatistiquesDepartementCommand extends Command
{
   public function __construct(private EntityManagerInterface $em)
   {
       parent::__construct();
   }


   protected function configure(): void
   {
       $this
           ->setDescription('Import des statistiques département depuis un CSV')
           ->addArgument('file', InputArgument::REQUIRED, 'Chemin du fichier CSV');
   }


   protected function execute(InputInterface $input, OutputInterface $output): int
   {
       $filePath = $input->getArgument('file');


       if (!is_readable($filePath)) {
           $output->writeln('<error>Fichier introuvable ou illisible</error>');
           return Command::FAILURE;
       }


       $handle = fopen($filePath, 'r');
       if (!$handle) {
           $output->writeln('<error>Impossible d\'ouvrir le fichier</error>');
           return Command::FAILURE;
       }


       $separator = ';';
       $batchSize = 50;
       $i = 0;


       // HEADER
       $header = fgetcsv($handle, 0, $separator);
       if ($header === false) {
           $output->writeln('<error>CSV vide</error>');
           return Command::FAILURE;
       }


       $header = array_map([$this, 'normalizeHeader'], $header);

       // map similar column names to canonical keys used in processing
       $mapped = [];
       foreach ($header as $name) {
           // strip non-alphanumeric to help matching
           $clean = preg_replace('/[^a-z0-9]/', '', $name);

           // detect department code column (cleaned string contains codedepart or codedepartement)
           if (preg_match('/^code.*depart/i', $clean)) {
               $mapped[] = 'code_departement';
               continue;
           }
           // year column
           if (preg_match('/annee/', $clean)) {
               $mapped[] = 'annee';
               continue;
           }
           // various stats columns may differ slightly, keep as-is
           // but handle known variants
           $variants = [
               // logements
               'nombredelogements' => 'nb_logements',
               'nblogements' => 'nb_logements',
               'tauxdelogementssociauxen' => 'taux_logements_sociaux',
               'tauxdelogementsvacantsen' => 'taux_logements_vacants',
               // population
               'nombredhabitants' => 'nb_habitants',
               'densitedepopulationaukm2' => 'densite',
               'variationdelapopulationsur10ansen' => 'variation_pop',
               'dontcontributiondusoldenaturelen' => 'solde_naturel',
               'dontcontributiondusoldemigratoireen' => 'solde_migratoire',
               'populationdemoinsde20ans' => 'pop_moins_20_ans',
               'populationde60ansetplus' => 'pop_plus_60_ans',
               'tauxdechomageaut4en' => 'taux_chomage',
               'tauxdepauvreteen' => 'taux_pauvrete',
           ];
           if (isset($variants[$clean])) {
               $mapped[] = $variants[$clean];
               continue;
           }

           $mapped[] = $name;
       }
       $header = $mapped;


       while (($row = fgetcsv($handle, 0, $separator)) !== false) {


           // Ignore lignes vides
           if ($row === [null] || count(array_filter($row)) === 0) {
               continue;
           }


           if (count($row) !== count($header)) {
               $output->writeln('<comment>Ligne ignorée (mauvais nombre de colonnes)</comment>');
               continue;
           }


           $data = array_combine($header, $row);


           $code = $this->formatCodeDepartement($data['code_departement'] ?? '');


           // skip rows without a valid department code
           if ($code === null) {
               $output->writeln('<comment>Code département vide, ligne ignorée</comment>');
               continue;
           }

           $departement = $this->em
               ->getRepository(Departements::class)
               ->find($code);

           if (!$departement) {
               $output->writeln("<comment>Département absent : $code</comment>");
               continue;
           }

           // determine which stats are present
           $populationKeys = ['nb_habitants','densite','variation_pop','solde_naturel','solde_migratoire','pop_moins_20_ans','pop_plus_60_ans','taux_chomage','taux_pauvrete'];
           $logementKeys = ['nb_logements','taux_logements_sociaux','taux_logements_vacants'];
           $hasPopulation = count(array_intersect($populationKeys, array_keys($data))) > 0;
           $hasLogements = count(array_intersect($logementKeys, array_keys($data))) > 0;

           // avoid duplicates for either type separately
           if ($hasPopulation) {
               $existing = $this->em
                   ->getRepository(Population::class)
                   ->findOneBy([
                       'code_dept' => $code,
                       'annee' => (int)($data['annee'] ?? 0)
                   ]);
               if ($existing) {
                   // if population record exists and we only import population, skip entire row
                   if (!$hasLogements) {
                       continue;
                   }
               }
           }
           if ($hasLogements) {
               $existingLog = $this->em
                   ->getRepository(Logements::class)
                   ->findOneBy([
                       'code_dept' => $code,
                       'annee' => (int)($data['annee'] ?? 0)
                   ]);
               if ($existingLog) {
                   // if logements exists and no population to add, skip
                   if (!$hasPopulation) {
                       continue;
                   }
               }
           }

           if ($hasPopulation) {
               $stat = new Population();
               $stat->setAnnee((int)($data['annee'] ?? 0));
               $stat->setCodeDept($code);
               if (($v = $this->int($data['nb_habitants'] ?? null)) !== null) {
                   $stat->setNbHabitants($v);
               }
               if (($v = $this->int($data['densite'] ?? null)) !== null) {
                   $stat->setDensite($v);
               }
               if (($v = $this->int($data['variation_pop'] ?? null)) !== null) {
                   $stat->setVariationPop($v);
               }
               if (($v = $this->int($data['solde_naturel'] ?? null)) !== null) {
                   $stat->setSoldeNaturel($v);
               }
               if (($v = $this->int($data['solde_migratoire'] ?? null)) !== null) {
                   $stat->setSoldeMigratoire($v);
               }
               if (($v = $this->int($data['pop_moins_20_ans'] ?? null)) !== null) {
                   $stat->setPopMoins20ans($v);
               }
               if (($v = $this->int($data['pop_plus_60_ans'] ?? null)) !== null) {
                   $stat->setPopPlus60ans($v);
               }
               if (($v = $this->decimal($data['taux_chomage'] ?? null)) !== null) {
                   $stat->setTauxChomage($v);
               }
               if (($v = $this->decimal($data['taux_pauvrete'] ?? null)) !== null) {
                   $stat->setTauxPauvrete($v);
               }

               $this->em->persist($stat);
           }

           if ($hasLogements) {
               $stat = new Logements();
               $stat->setAnnee((int)($data['annee'] ?? 0));
               $stat->setCodeDept($code);
               if (($v = $this->int($data['nb_logements'] ?? null)) !== null) {
                   $stat->setNbLogements($v);
               }
               if (($v = $this->decimal($data['taux_logements_sociaux'] ?? null)) !== null) {
                   $stat->setTauxLogementsSociaux($v);
               }
               if (($v = $this->decimal($data['taux_logements_vacants'] ?? null)) !== null) {
                   $stat->setTauxLogementsVacants($v);
               }

               $this->em->persist($stat);
           }


           if (($i % $batchSize) === 0 && $i > 0) {
               $this->em->flush();
               $this->em->clear(Population::class, Logements::class); // important
           }


           $i++;
       }


       $this->em->flush();
       fclose($handle);


       $output->writeln("<info>Import terminé : $i lignes</info>");


       return Command::SUCCESS;
   }


   private function normalizeHeader(string $value): string
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


   private function decimal($value): ?string
   {
       if ($value === null || $value === '') {
           return null;
       }
       return number_format((float)$value, 2, '.', '');
   }


   private function int($value): ?int
   {
       if ($value === null || $value === '') {
           return null;
       }
       return (int)$value;
   }


   private function formatCodeDepartement(string $code): ?string
   {
       $code = trim($code);
       if ($code === '') {
           return null;
       }
       // special alphanumeric departments are stored as-is
       if (in_array($code, ['2A', '2B'], true)) {
           return $code;
       }
       // drop leading zeros for numeric codes so they match the values
       // already present in the database (1..9 not stored as 01..09).
       $code = ltrim($code, '0');

       return $code;
   }
}