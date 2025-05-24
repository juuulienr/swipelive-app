# Swipe Live App

Application mobile de live shopping, permettant aux utilisateurs de diffuser du contenu en direct et de vendre des produits en temps réel.

## 🚀 Fonctionnalités

- Streaming vidéo en direct avec Agora
- Authentification via Firebase (Google, Apple, Facebook)
- Paiements intégrés avec Stripe
- Communication en temps réel avec Pusher
- Interface utilisateur native iOS et Android
- Géolocalisation avec Google Maps
- Système de likes et de commentaires
- Gestion de panier d'achat
- Notifications push
- Mode hors ligne
- Support multilingue

## 📱 Technologies

- Vue.js 3
- Capacitor 6
- Firebase Authentication
- Agora SDK
- Stripe SDK
- Pusher
- Google Maps API
- Vite
- Pinia (State Management)

## 🛠 Prérequis

- Node.js (version LTS recommandée)
- Xcode (pour iOS)
- Android Studio (pour Android)
- JDK 17 (pour Android)
- CocoaPods (pour iOS)

## ⚙️ Installation

1. Cloner le repository
```bash
git clone [url-du-repo]
cd swipelive-app
```

2. Installer les dépendances
```bash
npm install
```

3. Configuration des variables d'environnement
Créer un fichier `.env` à la racine du projet avec les variables suivantes :
```env
VITE_FIREBASE_API_KEY=votre_clé
VITE_AGORA_APP_ID=votre_clé
VITE_STRIPE_PUBLIC_KEY=votre_clé
VITE_GOOGLE_MAPS_API_KEY=votre_clé
VITE_PUSHER_KEY=votre_clé
```

## 📱 Configuration iOS

1. Mettre à jour le Podfile :
```ruby
post_install do |installer|
    installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
            config.build_settings['DEBUG_INFORMATION_FORMAT'] = 'dwarf-with-dsym'
            config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '15.0'
            if target.respond_to?(:product_type) and target.product_type == "com.apple.product-type.bundle"
                config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
            end
        end
    end
end
```

## 🤖 Configuration Android

1. Configurer gradle.properties :
```properties
org.gradle.jvmargs=-Xmx2048m
android.useAndroidX=true
android.enableJetifier=true
kotlin.code.style=official
```

2. Mettre à jour AndroidManifest.xml :
- Ajouter `android:exported="true"` aux balises `<activity>` et `<receiver>` appropriées

## 🚀 Scripts disponibles

- `npm run dev` : Démarre le serveur de développement
- `npm run build` : Build le projet et synchronise avec Capacitor
- `npm run ios` : Build et ouvre le projet dans Xcode
- `npm run ios-debug` : Build et lance sur un appareil iOS connecté
- `npm run ios-emulator` : Build et lance dans le simulateur iOS
- `npm run android` : Build et ouvre le projet dans Android Studio
- `npm run android-device` : Build et lance sur un appareil Android connecté

## 📦 Structure du projet

```
swipelive-app/
├── src/                # Code source Vue.js
│   ├── assets/        # Ressources statiques
│   ├── components/    # Composants Vue
│   ├── views/         # Pages de l'application
│   ├── stores/        # State management (Pinia)
│   ├── router/        # Configuration des routes
│   └── utils/         # Utilitaires
├── public/            # Fichiers publics
├── ios/               # Configuration iOS native
├── android/           # Configuration Android native
└── capacitor.config.json  # Configuration Capacitor
```

## 🔐 Sécurité

- Authentification sécurisée via Firebase
- Paiements sécurisés via Stripe
- Chiffrement des données sensibles
- Protection contre les attaques XSS
- Validation des entrées utilisateur

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🔐 Configuration des Variables d'Environnement

1. Copiez le fichier `.env.example` en `.env` :
```bash
cp .env.example .env
```

2. Remplissez les variables dans le fichier `.env` avec vos propres clés API :
- `VITE_STRIPE_PUBLIC_KEY` : Clé publique Stripe pour les paiements
- `VITE_GOOGLE_MAPS_API_KEY` : Clé API Google Maps pour la géolocalisation
- `VITE_BUGSNAG_API_KEY` : Clé API Bugsnag pour le tracking des erreurs
- `VITE_CLOUDINARY_URL` : URL de base Cloudinary pour le stockage des images
- `VITE_CLOUDINARY_THUMB_256` : URL Cloudinary pour les miniatures 256x256
- `VITE_CLOUDINARY_THUMB_750` : URL Cloudinary pour les miniatures 750x750
- `VITE_AMAZON_S3_URL` : URL du bucket Amazon S3
- `VITE_APP_URL` : URL de production de l'application
- `VITE_DEV_APP_URL` : URL de développement local

⚠️ Ne jamais commiter le fichier `.env` contenant vos clés API.


