<?php

// setters et getters pour les infos sur les regions

// données présentes :
// id_region
// nom_region
// departements

namespace App\Entity;

use App\Repository\RegionsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RegionsRepository::class)]
class Regions
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id_region = null;

    #[ORM\Column(length: 150)]
    private ?string $nom_region = null;

    #[ORM\OneToMany(targetEntity: Departements::class, mappedBy: 'id_region')]
    private Collection $departements;

    public function __construct()
    {
        $this->departements = new ArrayCollection();
    }

    public function getIdRegion(): ?int
    {
        return $this->id_region;
    }

    public function setIdRegion(int $id_region): static
    {
        $this->id_region = $id_region;

        return $this;
    }

    public function getNomRegion(): ?string
    {
        return $this->nom_region;
    }

    public function setNomRegion(string $nom_region): static
    {
        $this->nom_region = $nom_region;

        return $this;
    }

    public function getDepartements(): Collection
    {
        return $this->departements;
    }

    public function addDepartement(Departements $departement): static
    {
        if (!$this->departements->contains($departement)) {
            $this->departements->add($departement);
            $departement->setIdRegion($this);
        }
        // contains = vérifie si l'object existe déjà
        // add = ajoute l'élément à la collection
        // setIdRegion = met à jour le lien entre la region et le département
        return $this;
    }

    public function removeDepartement(Departements $departement): static
    {
        if ($this->departements->removeElement($departement)) {
            if ($departement->getIdRegion() === $this) {
                $departement->setIdRegion(null);
            }
        }
        // removeElement = supprime l'élément 
        // setIdRegion = met à jour le lien entre la region et le département
        return $this;
    }
}
