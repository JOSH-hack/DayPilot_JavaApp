// controllers/authController.js — Authentification Google OAuth et JWT

const jwt = require('jsonwebtoken');
const utilisateurRepository = require('../repository/utilisateurRepository');

// Générer un JWT
const generateToken = (utilisateur) => {
    return jwt.sign(
        {
            id_utilisateur: utilisateur.id_utilisateur,
            email: utilisateur.email,
            nom: utilisateur.nom,
        },
        process.env.JWT_SECRET || 'secret-dev-key',
        { expiresIn: '7d' }
    );
};
//Callback Google OAuth
const googleCallback = async (req, res) => {
    try {
        // Passport a rempli req.user après authentification
        const utilisateur = req.user;

        if (!utilisateur) {
            return res.status(401).json({ error: 'Authentification échouée' });
        }

        // Mettre à jour last_login
        await utilisateurRepository.updateLastLogin(utilisateur.id_utilisateur);

        // Générer JWT
        const token = generateToken(utilisateur);

        // Retourner JWT + profil
        res.json({
            token,
            utilisateur: {
                id_utilisateur: utilisateur.id_utilisateur,
                nom: utilisateur.nom,
                email: utilisateur.email,
                theme_prefere: utilisateur.theme_prefere,
            },
        });
    } catch (error) {
        console.error('Erreur googleCallback:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Authentification mobile avec token Google
const mobileToken = async (req, res) => {
    try {
        const { access_token } = req.body;

        if (!access_token) {
            return res.status(400).json({ error: 'access_token requis' });
        }

        // Appeler Google People API pour récupérer le profil
        const profileResponse = await fetch(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        if (!profileResponse.ok) {
            return res.status(401).json({ error: 'Token Google invalide' });
        }

        const profile = await profileResponse.json();
        const { id: google_id, name: displayName, email } = profile;

        if (!email) {
            return res.status(400).json({ error: 'Aucun email dans le profil Google' });
        }

        // Chercher l'utilisateur par google_id
        let utilisateur = await utilisateurRepository.findByGoogleId(google_id);

        // Si pas trouvé, chercher par email
        if (!utilisateur) {
            utilisateur = await utilisateurRepository.findByEmail(email);

            // Si trouvé par email mais pas de google_id, mettre à jour
            if (utilisateur && !utilisateur.google_id) {
                utilisateur = await utilisateurRepository.updateGoogleId(
                    utilisateur.id_utilisateur,
                    google_id
                );
            }
        }

        // Si toujours pas trouvé, créer un nouvel utilisateur
        if (!utilisateur) {
            utilisateur = await utilisateurRepository.create({
                nom: displayName,
                email,
                google_id,
                mot_de_passe: null,
            });
        }

        // Mettre à jour last_login
        await utilisateurRepository.updateLastLogin(utilisateur.id_utilisateur);

        // Générer JWT
        const token = generateToken(utilisateur);

        // Retourner JWT + profil
        res.json({
            token,
            utilisateur: {
                id_utilisateur: utilisateur.id_utilisateur,
                nom: utilisateur.nom,
                email: utilisateur.email,
                theme_prefere: utilisateur.theme_prefere,
            },
        });
    } catch (error) {
        console.error(' Erreur mobileToken:', error.message);
        res.status(500).json({ error: error.message });
    }
};

//Logout
const logout = async (req, res) => {
    try {
        res.json({ message: 'Déconnecté avec succès' });
    } catch (error) {
        console.error(' Erreur logout:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { googleCallback, mobileToken, logout };
