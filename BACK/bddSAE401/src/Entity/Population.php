<?php

namespace App\Entity;

use App\Repository\PopulationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PopulationRepository::class)]
class Population
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $annee = null;

    #[ORM\Column(length: 10)]
    private ?string $code_dept = null;

    #[ORM\Column(nullable: true)]
    private ?float $nb_habitants = null;

    #[ORM\Column(nullable: true)]
    private ?float $densite = null;

    #[ORM\Column(nullable: true)]
    private ?float $variation_pop = null;

    #[ORM\Column(nullable: true)]
    private ?float $solde_naturel = null;

    #[ORM\Column(nullable: true)]
    private ?float $solde_migratoire = null;

    #[ORM\Column(nullable: true)]
    private ?float $pop_moins_20ans = null;

    #[ORM\Column(nullable: true)]
    private ?float $pop_plus_60ans = null;

    #[ORM\Column(nullable: true)]
    private ?float $taux_chomage = null;

    #[ORM\Column(nullable: true)]
    private ?float $taux_pauvrete = null;

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

    public function getNbHabitants(): ?float
    {
        return $this->nb_habitants;
    }

    public function setNbHabitants(?float $nb_habitants): static
    {
        $this->nb_habitants = $nb_habitants;

        return $this;
    }

    public function getDensite(): ?float
    {
        return $this->densite;
    }

    public function setDensite(?float $densite): static
    {
        $this->densite = $densite;

        return $this;
    }

    public function getVariationPop(): ?float
    {
        return $this->variation_pop;
    }

    public function setVariationPop(?float $variation_pop): static
    {
        $this->variation_pop = $variation_pop;

        return $this;
    }

    public function getSoldeNaturel(): ?float
    {
        return $this->solde_naturel;
    }

    public function setSoldeNaturel(?float $solde_naturel): static
    {
        $this->solde_naturel = $solde_naturel;

        return $this;
    }

    public function getSoldeMigratoire(): ?float
    {
        return $this->solde_migratoire;
    }

    public function setSoldeMigratoire(?float $solde_migratoire): static
    {
        $this->solde_migratoire = $solde_migratoire;

        return $this;
    }

    public function getPopMoins20ans(): ?float
    {
        return $this->pop_moins_20ans;
    }

    public function setPopMoins20ans(?float $pop_moins_20ans): static
    {
        $this->pop_moins_20ans = $pop_moins_20ans;

        return $this;
    }

    public function getPopPlus60ans(): ?float
    {
        return $this->pop_plus_60ans;
    }

    public function setPopPlus60ans(?float $pop_plus_60ans): static
    {
        $this->pop_plus_60ans = $pop_plus_60ans;

        return $this;
    }

    public function getTauxChomage(): ?float
    {
        return $this->taux_chomage;
    }

    public function setTauxChomage(?float $taux_chomage): static
    {
        $this->taux_chomage = $taux_chomage;

        return $this;
    }

    public function getTauxPauvrete(): ?float
    {
        return $this->taux_pauvrete;
    }

    public function setTauxPauvrete(?float $taux_pauvrete): static
    {
        $this->taux_pauvrete = $taux_pauvrete;

        return $this;
    }
}
