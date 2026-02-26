<?php

namespace App\Entity;

use App\Repository\RegionsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
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

    /**
     * @var Collection<int, Departements>
     */
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

    /**
     * @return Collection<int, Departements>
     */
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

        return $this;
    }

    public function removeDepartement(Departements $departement): static
    {
        if ($this->departements->removeElement($departement)) {
            // set the owning side to null (unless already changed)
            if ($departement->getIdRegion() === $this) {
                $departement->setIdRegion(null);
            }
        }

        return $this;
    }
}
