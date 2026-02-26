<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260226151037 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE departements (code_dept VARCHAR(10) NOT NULL, nom_dept VARCHAR(150) NOT NULL, annee INT NOT NULL, id_region INT NOT NULL, INDEX IDX_CF7489B22955449B (id_region), PRIMARY KEY (code_dept)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE logements (id INT AUTO_INCREMENT NOT NULL, annee INT NOT NULL, code_dept VARCHAR(10) NOT NULL, nb_logements DOUBLE PRECISION NOT NULL, taux_logements_sociaux DOUBLE PRECISION NOT NULL, taux_logements_vacants DOUBLE PRECISION NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE population (id INT AUTO_INCREMENT NOT NULL, annee INT NOT NULL, code_dept VARCHAR(10) NOT NULL, nb_habitants DOUBLE PRECISION NOT NULL, densite DOUBLE PRECISION NOT NULL, variation_pop DOUBLE PRECISION NOT NULL, solde_naturel DOUBLE PRECISION NOT NULL, solde_migratoire DOUBLE PRECISION NOT NULL, pop_moins_20ans DOUBLE PRECISION NOT NULL, pop_plus_60ans DOUBLE PRECISION NOT NULL, taux_chomage DOUBLE PRECISION NOT NULL, taux_pauvrete DOUBLE PRECISION NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE regions (id_region INT AUTO_INCREMENT NOT NULL, nom_region VARCHAR(150) NOT NULL, annee INT NOT NULL, PRIMARY KEY (id_region)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0E3BD61CE16BA31DBBF396750 (queue_name, available_at, delivered_at, id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE departements ADD CONSTRAINT FK_CF7489B22955449B FOREIGN KEY (id_region) REFERENCES regions (id_region)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE departements DROP FOREIGN KEY FK_CF7489B22955449B');
        $this->addSql('DROP TABLE departements');
        $this->addSql('DROP TABLE logements');
        $this->addSql('DROP TABLE population');
        $this->addSql('DROP TABLE regions');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
