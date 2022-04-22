Installation:

dans une console ouvert a la racine du projet tapez:
-npm i
-npm start

Ensuite import le fichier SQL du dossier DataBase dans votre base de données relationnel.
Et pour finir créer un fichier .env dans le dossier config du projet avec comme donné :
PORT = {port utilisé pour heberger le serveur}
DBHOST= {adress Ip de la base de donné SQL}
DBPORT= {port de la base SQL}
DBUSER = {User de la base SQL}
DBPASSWORD = {Mot de passe de la base SQL}
DBNAME = {Nom de la base de donné SQL}
KEYTOKEN = {Clef de chiffrement}
ACCESTOKEN = {Autre clef de chiffrement}
