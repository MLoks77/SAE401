<?php
// joachim tocqueville
// TD3 le :  https://docs.google.com/document/d/1cmGmHt2lEVTiunOXm3K0k81q1FPe75wV_yVk5F02mB4/edit?tab=t.0#heading=h.m0928a1c55c0

namespace App\Controller\API;

use App\Repository\PopulationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class PopulationController extends AbstractController
{
    #[Route('/api/population', methods: ['GET'], name: 'api_population_get')]
    public function index(PopulationRepository $repository, Request $request): JsonResponse
    {
        $id = $request->query->get('id');
        $annee = $request->query->get('annee');
        $code_dept = $request->query->get('code_dept');
        $nb_habitants = $request->query->get('nb_habitants');
        $densite = $request->query->get('densite');
        $variation_pop = $request->query->get('variation_pop');
        $solde_naturel = $request->query->get('solde_naturel');
        $solde_migratoire = $request->query->get('solde_migratoire');
        $pop_moins_20ans = $request->query->get('pop_moins_20ans');
        $pop_plus_60ans = $request->query->get('pop_plus_60ans');
        $taux_chomage = $request->query->get('taux_chomage');
        $taux_pauvrete = $request->query->get('taux_pauvrete');

        $populationdatas = [];
        if ($id) {
            $populationdatas['id'] = $id;
        }
        if ($annee) {
            $populationdatas['annee'] = $annee;
        }
        if ($code_dept) {
            $populationdatas['code_dept'] = $code_dept;
        }
        if ($nb_habitants) {
            $populationdatas['nb_habitants'] = $nb_habitants;
        }
        if ($densite) {
            $populationdatas['densite'] = $densite;
        }
        if ($variation_pop) {
            $populationdatas['variation_pop'] = $variation_pop;
        }
        if ($solde_naturel) {
            $populationdatas['solde_naturel'] = $solde_naturel;
        }
        if ($solde_migratoire) {
            $populationdatas['solde_migratoire'] = $solde_migratoire;
        }
        if ($pop_moins_20ans) {
            $populationdatas['pop_moins_20ans'] = $pop_moins_20ans;
        }
        if ($pop_plus_60ans) {
            $populationdatas['pop_plus_60ans'] = $pop_plus_60ans;
        }
        if ($taux_chomage) {
            $populationdatas['taux_chomage'] = $taux_chomage;
        }
        if ($taux_pauvrete) {
            $populationdatas['taux_pauvrete'] = $taux_pauvrete;
        }

        $population = $repository->findBy($populationdatas);
        return $this->json($population, 200, [], ['groups' => 'pop:read']);
    }
}