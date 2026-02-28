<?php

namespace App\Repository;

use App\Entity\Departements;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/* fait par [ mettez votre nom et vous le prenez ] */


class DepartementsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Departements::class);
    }

}
