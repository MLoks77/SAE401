<?php

namespace App\Repository;

use App\Entity\Population;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class PopulationRepository extends ServiceEntityRepository
{
    public function findByRegion(int $id_region): array
    {
        return $this->createQueryBuilder('p')
            ->select('p.annee')
            ->addSelect('SUM(p.nb_habitants) as nb_habitants')
            ->addSelect('(SUM(p.solde_naturel) + SUM(p.solde_migratoire)) as accroissement')
            ->addSelect('AVG(p.pop_moins_20ans) as pop_moins_20ans')
            ->addSelect('AVG(p.pop_plus_60ans) as pop_plus_60ans')
            ->addSelect('AVG(p.taux_chomage) as taux_chomage')
            ->addSelect('AVG(p.taux_pauvrete) as taux_pauvrete')
            ->join('App\Entity\Departements', 'd', 'WITH', 'p.code_dept = d.code_dept')
            ->where('d.id_region = :id_region')
            ->setParameter('id_region', $id_region)
            ->groupBy('p.annee')
            ->orderBy('p.annee', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Population::class);
    }
}
