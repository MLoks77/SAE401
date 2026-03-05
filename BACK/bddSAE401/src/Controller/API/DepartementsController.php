<?php
// maxime derènes
// TD3 le :  https://docs.google.com/document/d/1cmGmHt2lEVTiunOXm3K0k81q1FPe75wV_yVk5F02mB4/edit?tab=t.0#heading=h.m0928a1c55c0

namespace App\Controller\API;

use App\Repository\DepartementsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class DepartementsController extends AbstractController
{
    #[Route('/api/departements', methods: ['GET'], name: 'api_departements_get')]
    public function index(DepartementsRepository $repository, Request $request): JsonResponse
    {
        // on utilise request car on veut récupérer les données de l'url, plus sécure que $_GET
        $code_dept = $request->query->get('code_dept');
        $nom_dept = $request->query->get('nom_dept');
        $id_region = $request->query->get('id_region');

        $departementdatas = [];
        if ($code_dept) {
            $departementdatas['code_dept'] = $code_dept;
        }
        if ($nom_dept) {
            $departementdatas['nom_dept'] = $nom_dept;
        }
        if ($id_region) {
            $departementdatas['id_region'] = $id_region;
        }

        $departements = $repository->findBy($departementdatas);
        return $this->json($departements, 200, [], ['groups' => 'dept:read']);
    }
}