<?php

// setters et getters pour les informations sur les départements

// données présentes :
// code_dept
// nom_dept
// id_region

namespace App\Entity;

use App\Repository\DepartementsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DepartementsRepository::class)]
class Departements
{
    #[ORM\Id]
    #[ORM\Column(length: 10)]
    private ?string $code_dept = null;

    // nom du département
    #[ORM\Column(length: 150)]
    private ?string $nom_dept = null;

    #[ORM\ManyToOne(inversedBy: 'departements')] // manytoone = une region peut avoir plusieurs départements
    #[ORM\JoinColumn(
        name: 'id_region',
        referencedColumnName: 'id_region',
        nullable: false
    )] // joincolumn = la region est liée au département par son nom, sa colonne et il peut être null
    private ?Regions $id_region = null;

    public function getCodeDept(): ?string
    {
        return $this->code_dept;
    }

    public function setCodeDept(string $code_dept): static
    {
        $this->code_dept = $code_dept;

        return $this;
    }

    public function getNomDept(): ?string
    {
        return $this->nom_dept;
    }

    public function setNomDept(string $nom_dept): static
    {
        $this->nom_dept = $nom_dept;

        return $this;
    }

    public function getIdRegion(): ?Regions
    {
        return $this->id_region;
    }

    public function setIdRegion(?Regions $id_region): static
    {
        $this->id_region = $id_region;

        return $this;
    }
}
