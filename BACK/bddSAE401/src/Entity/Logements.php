<?php

// setters et getters pour les informations sur les logements

// données présentes :
// annee
// code_dept
// nb_logements
// taux_logements_sociaux
// taux_logements_vacants

namespace App\Entity;

use App\Repository\LogementsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LogementsRepository::class)]
class Logements
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $annee = null;

    #[ORM\Column(length: 10)]
    private ?string $code_dept = null;

    #[ORM\Column]
    private ?float $nb_logements = null;

    #[ORM\Column]
    private ?float $taux_logements_sociaux = null;

    #[ORM\Column]
    private ?float $taux_logements_vacants = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAnnee(): ?int
    {
        return $this->annee;
    }

    public function setAnnee(int $annee): static
    {
        $this->annee = $annee;

        return $this;
    }

    public function getCodeDept(): ?string
    {
        return $this->code_dept;
    }

    public function setCodeDept(string $code_dept): static
    {
        $this->code_dept = $code_dept;

        return $this;
    }

    public function getNbLogements(): ?float
    {
        return $this->nb_logements;
    }

    public function setNbLogements(float $nb_logements): static
    {
        $this->nb_logements = $nb_logements;

        return $this;
    }

    public function getTauxLogementsSociaux(): ?float
    {
        return $this->taux_logements_sociaux;
    }

    public function setTauxLogementsSociaux(float $taux_logements_sociaux): static
    {
        $this->taux_logements_sociaux = $taux_logements_sociaux;

        return $this;
    }

    public function getTauxLogementsVacants(): ?float
    {
        return $this->taux_logements_vacants;
    }

    public function setTauxLogementsVacants(float $taux_logements_vacants): static
    {
        $this->taux_logements_vacants = $taux_logements_vacants;

        return $this;
    }
}
