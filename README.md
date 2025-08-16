# 🤖 Bot Discord — Hébergement Gratuit & Installation

Ce projet vous permet de déployer facilement un bot Discord professionnel, gratuit et **24h/24** grâce à Render et Cron-Job.org.
Video : https://youtu.be/AmpohTUK1Xc?si=UdK2xUiu3Y9CYB0b
---

## 🛠️ Création du Bot Discord

1. Rendez-vous sur : [https://discord.com/developers/applications](https://discord.com/developers/applications)
2. Cliquez sur **"Nouvelle application"**
3. Donnez un nom à votre bot
4. Dans l'onglet **"Bot"** :
   - Cliquez sur **"Add Bot"**
   - Activez les 3 options suivantes :
     - ✅ Presence Intent
     - ✅ Server Members Intent
     - ✅ Message Content Intent
   - Cliquez sur **"Reset Token"** et **copiez le token**
5. Dans l'onglet **OAuth2 > URL Generator** :
   - Cochez `bot` dans "Scopes"
   - Cochez `Administrator` dans "Bot Permissions"
   - Copiez l’URL générée et ouvrez-la dans un nouvel onglet pour inviter votre bot sur votre serveur

---

## 🍴 Fork et Configuration

1. Forkez ce dépôt GitHub : [https://github.com/zsfeq/Zprotect](https://github.com/zsfeq/Zprotect)
   - Cliquez sur le bouton **"Fork"** en haut à droite
2. Dans votre dépôt forké, éditez le fichier `config.js` et changer `index.js` :
   - Cliquez sur l'icône ✏️ (crayon)
   - Modifiez les champs suivants :

```js
buyer: "VOTRE_ID_DISCORD",   // Remplacez par votre ID Discord
couleur: "#7289da",          // Couleur des embeds
footer: "Nom du bot",        // Pied de page des embeds
maxServer: 3,                // Nombre max de serveurs gérés
prefix: "."                  // Préfixe des commandes
```
---

## 🍴 Fork et Configuration

1. Créez un compte sur : https://render.com
2. Cliquez sur "New > Web Service"
3. Connectez votre compte GitHub et sélectionnez votre fork
4. Configurez le service :
   - Option	Valeur
   - name : Ce que vous voulez
   - Region	: Virginia
   - Runtime : Node
   - Build Command : npm i
   - Start Command : node index.js
   - Instance Type : Free (gratuit)
5. Ajoutez les variables d'environnement :
   - token : votre token Discord
   - NODE_VERSION : 18.16.0 (ou la version Node LTS)
6. Cliquez sur "Create Web Service"
7. Allez dans l’onglet Logs et vérifiez que le message Bot connecté s’affiche ✅
 
---

## ♻️ Maintenir le bot actif 24h/24
1. Créez un compte sur https://cron-job.org
2. Une fois connecté, allez dans l’onglet Cronjobs et créez un nouveau Cronjob :
   - Nom : ce que vous voulez
   - URL : l’URL de votre service Render (visible dans la barre d’adresse de votre service)
   - Calendrier d'exécution : toutes les minutes (Every minute)
   - Cela enverra une requête régulière à votre bot pour le maintenir actif en permanence.

---

## 🧑‍💻 Auteur
Développé avec ❤️ par [zsfeq]