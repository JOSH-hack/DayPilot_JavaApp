# Problème bcrypt - Résumé et Solutions

## 1 . Le Problème

```
Error: Cannot find module '/home/josh/Bureau/Daypilot/backend/node_modules/.pnpm/bcrypt@5.1.1/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node'
```

Le serveur Node.js ne peut pas charger le binding natif compilé de bcrypt, causant un crash au démarrage qui fait que la comme run dev n'aboutit pas.

---

## Causes Identifiées

### 1. **Bindings pré-compilés obsolètes** (Cause principale)

- Le fichier `bcrypt_lib.node` était pré-compilé en août 2023
- **Incompatibilité ABI** avec Node.js v24.14.0 (trop récent)
- Les bindings natifs doivent correspondent à la version de Node.js utilisée

### 2. **pnpm bloque les build scripts**

- pnpm ignore les scripts de compilation pour des raisons de sécurité
- Sans approbation, bcrypt ne peut pas se recompiler automatiquement
- Message d'avertissement : `Ignored build scripts: bcrypt@5.1.1`

### 3. **Dépendances système manquantes** (secondaire)

- Les outils de build (gcc, g++, make, python3) étaient nécessaires
- Sans ces outils, la recompilation échouerait silencieusement

---

## Solutions Appliquées

### **Solution 1 : Approuver les build scripts dans pnpm**

```bash
pnpm approve-builds
# Sélectionner bcrypt et approuver
```

### **Solution 2 : Supprimer le binding incompatible**

```bash
rm -f node_modules/.pnpm/bcrypt@5.1.1/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node
```

### **Solution 3 : Recompiler depuis les sources pour Node.js 24**

```bash
npm rebuild bcrypt --build-from-source
```

---

## 📋 Procédure Complète de Problématique

Si vous rencontrez ce problème à nouveau :

```bash
cd /home/josh/Bureau/Daypilot/backend

# Étape 1 : Installer/Vérifier les outils de build
sudo apt-get install build-essential python3 g++ make

# Étape 2 : Nettoyer node_modules
rm -rf node_modules pnpm-lock.yaml

# Étape 3 : Réinstaller les dépendances
pnpm install

# Étape 4 : Approuver les build scripts
pnpm approve-builds

# Étape 5 : Recompiler bcrypt
npm rebuild bcrypt --build-from-source

# Étape 6 : Lancer le serveur
pnpm run dev
```

---

## Points Clés à Retenir

| Aspect                         | Détail                                                                                      |
| ------------------------------ | -------------------------------------------------------------------------------------------- |
| **Cause Root**           | Incompatibilité ABI entre Node.js 24 et bcrypt pré-compilé 2023                           |
| **Symptôme**            | `Cannot find module 'bcrypt_lib.node'` au démarrage                                       |
| **Composants Affectés** | `utilisateurController.js` → `utilisateurRoutes.js` → `app.js`                       |
| **Fichier Clé**         | `/node_modules/.pnpm/bcrypt@5.1.1/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node` |
| **Solution Finale**      | Recompiler depuis les sources pour Node.js 24                                                |
| **Date Résolution**     | 20 avril 2026, 03:11                                                                         |

---

## Versions Actuelles

```
Node.js : v24.14.0
npm : 11.9.0
pnpm : 10.30.3
bcrypt : 5.1.1
```

---

##   Prévention Future

1. **Utiliser une version LTS de Node.js** (v20 ou v22) plus stable
2. **Toujours approuver les build scripts** lors de `pnpm install` la première fois
3. **Garder les outils de build installés** pour les dépendances natives
4. **Commiter `.npmrc` ou `.pnpmrc`** avec les configurations de build si nécessaire

---

**Statut** : Résolu et testé - Serveur fonctionne correctement
