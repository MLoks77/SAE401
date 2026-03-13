<?php

namespace App\Repository;

use App\Entity\Logements;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


class LogementsRepository extends ServiceEntityRepository
{
    // fonction pour trouver les données de la base de données par région et trier en sous forme de requêtes query
    public function findByRegion(int $id_region): array
    {
        return $this->createQueryBuilder('l')
            ->select('l.annee')
            ->addSelect('SUM(l.nb_logements) as nb_logements')
            ->addSelect('AVG(l.taux_logements_sociaux) as taux_logements_sociaux')
            ->addSelect('AVG(l.taux_logements_vacants) as taux_logements_vacants')
            ->join('App\Entity\Departements', 'd', 'WITH', 'l.code_dept = d.code_dept')
            ->where('d.id_region = :id_region')
            ->setParameter('id_region', $id_region)
            ->groupBy('l.annee')
            ->orderBy('l.annee', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
