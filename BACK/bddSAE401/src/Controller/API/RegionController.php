<?php
// maxime derènes
// TD3 le :  https://docs.google.com/document/d/1cmGmHt2lEVTiunOXm3K0k81q1FPe75wV_yVk5F02mB4/edit?tab=t.0#heading=h.m0928a1c55c0

namespace App\Controller\API;

use App\Repository\RegionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

// on utilise Attributes au lieu de annotations car on est sur le format de Symfony 7 plus moderne

class RegionController extends AbstractController
{
    #[Route('/api/regions', methods: ['GET'], name: 'api_regions_get')]
    public function index(RegionsRepository $repository, Request $request): JsonResponse
    {
        $id_region = $request->query->get('id_region');
        $nom_region = $request->query->get('nom_region');

        $regiondatas = [];
        if ($id_region) {
            $regiondatas['id_region'] = $id_region;
        }
        if ($nom_region) {
            $regiondatas['nom_region'] = $nom_region;
        }

        $regions = $repository->findBy($regiondatas);
        return $this->json($regions, 200, [], ['groups' => 'region:read']);
        // groups : permet de spécifier quels groupes de données on veut récupérer
        // read : permet de lire les données
    }
    // il récupère tout, à vous de mettre ce dont vous avez besoin
}

