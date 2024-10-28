module.exports = {
  publicPath: '/',  // Définit le chemin racine pour le chargement des ressources
  outputDir: 'cordova_app/www',
  assetsDir: 'assets', // Définir le répertoire des assets si nécessaire
  runtimeCompiler: true, // Si tu as besoin du compilateur à l'exécution pour les templates
  productionSourceMap: false, // Désactive les source maps en production pour des raisons de performance
  parallel: true, // Active le mode parallèle pour accélérer la compilation
  css: {
    extract: true, // Extrait le CSS pour les performances
  }
};
