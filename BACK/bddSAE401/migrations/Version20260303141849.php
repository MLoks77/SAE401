<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260303141849 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE departements DROP annee');
        $this->addSql('ALTER TABLE departements ADD CONSTRAINT FK_CF7489B22955449B FOREIGN KEY (id_region) REFERENCES regions (id_region)');
        $this->addSql('ALTER TABLE population CHANGE nb_habitants nb_habitants DOUBLE PRECISION DEFAULT NULL, CHANGE densite densite DOUBLE PRECISION DEFAULT NULL, CHANGE variation_pop variation_pop DOUBLE PRECISION DEFAULT NULL, CHANGE solde_naturel solde_naturel DOUBLE PRECISION DEFAULT NULL, CHANGE solde_migratoire solde_migratoire DOUBLE PRECISION DEFAULT NULL, CHANGE pop_moins_20ans pop_moins_20ans DOUBLE PRECISION DEFAULT NULL, CHANGE pop_plus_60ans pop_plus_60ans DOUBLE PRECISION DEFAULT NULL, CHANGE taux_chomage taux_chomage DOUBLE PRECISION DEFAULT NULL, CHANGE taux_pauvrete taux_pauvrete DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE regions DROP annee');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE departements DROP FOREIGN KEY FK_CF7489B22955449B');
        $this->addSql('ALTER TABLE departements ADD annee INT NOT NULL');
        $this->addSql('ALTER TABLE population CHANGE nb_habitants nb_habitants DOUBLE PRECISION NOT NULL, CHANGE densite densite DOUBLE PRECISION NOT NULL, CHANGE variation_pop variation_pop DOUBLE PRECISION NOT NULL, CHANGE solde_naturel solde_naturel DOUBLE PRECISION NOT NULL, CHANGE solde_migratoire solde_migratoire DOUBLE PRECISION NOT NULL, CHANGE pop_moins_20ans pop_moins_20ans DOUBLE PRECISION NOT NULL, CHANGE pop_plus_60ans pop_plus_60ans DOUBLE PRECISION NOT NULL, CHANGE taux_chomage taux_chomage DOUBLE PRECISION NOT NULL, CHANGE taux_pauvrete taux_pauvrete DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE regions ADD annee INT NOT NULL');
    }
}
