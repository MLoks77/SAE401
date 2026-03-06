<?php

// Chisiu Sebastien
// TD3 le :  https://docs.google.com/document/d/1cmGmHt2lEVTiunOXm3K0k81q1FPe75wV_yVk5F02mB4/edit?tab=t.0#heading=h.m0928a1c55c0

namespace App\Controller\API;

use App\Repository\LogementsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class LogementController extends AbstractController
{
    #[Route('/api/logements', methods: ['GET'], name: 'api_logements_get')]
    public function index(LogementsRepository $repository, Request $request): JsonResponse
    {
        $id_logement = $request->query->get('id_logement');
        $annee = $request->query->get('annee');
        $code_dept = $request->query->get('code_dept');
        $nb_logements = $request->query->get('nb_logements');
        $taux_logements_sociaux = $request->query->get('taux_logements_sociaux');
        $taux_logements_vacants = $request->query->get('taux_logements_vacants');

        $logementdatas = [];
        if ($id_logement) {
            $logementdatas['id'] = $id_logement;
        }
        if ($annee) {
            $logementdatas['annee'] = $annee;
        }
        if ($code_dept) {
            $logementdatas['code_dept'] = $code_dept;
        }
        if ($nb_logements) {
            $logementdatas['nb_logements'] = $nb_logements;
        }
        if ($taux_logements_sociaux) {
            $logementdatas['taux_logements_sociaux'] = $taux_logements_sociaux;
        }
        if ($taux_logements_vacants) {
            $logementdatas['taux_logements_vacants'] = $taux_logements_vacants;
        }

        $logements = $repository->findBy($logementdatas);
        return $this->json($logements, 200, [], ['groups' => 'logement:read']);
    }
}