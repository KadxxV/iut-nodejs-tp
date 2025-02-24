# IUT Project


## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/KadxxV/iut-project.git
    cd iut-project
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

## Configuration

Assurez-vous de configurer les variables d'environnement nécessaires dans un fichier `.env`.

ETHEREAL_USER=antonette.tremblay@ethereal.email
ETHEREAL_PASS=2ZTtb6t5vnhdcsUNEY
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587

DB_HOST='0.0.0.0',
DB_USER='root',
DB_PASSWORD='hapi',
DB_DATABASE='user',
DB_PORT=3308

Et créez le Docker pour la bdd

```bash
docker run -d --name hapi-mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user mysql:8.0 --default-authentication-plugin=mysql_native_password
```
## Démarrage

Pour démarrer le serveur, exécutez :
```bash
npm start