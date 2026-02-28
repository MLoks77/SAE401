<?php

// TD3 le :  https://docs.google.com/document/d/1cmGmHt2lEVTiunOXm3K0k81q1FPe75wV_yVk5F02mB4/edit?tab=t.0#heading=h.m0928a1c55c0

namespace App\Controller\API;

use App\Repository\LogementsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/logements', name: 'api_logements_')]
class LogementController extends AbstractController
{
    #[Route('', methods: ['GET'], name: 'get_logements')]
    public function index(LogementsRepository $repository): JsonResponse
    {
        return $this->json($repository->findAll());
    }
    // il récupère tout, à vous de mettre ce dont vous avez besoin
}