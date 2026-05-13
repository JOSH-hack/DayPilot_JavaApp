// config/passport.js — Configuration Google OAuth avec Passport

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const utilisateurRepository = require('../repository/utilisateurRepository');

// Configuration de la stratégie Google
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const { id: google_id, displayName, emails } = profile;
                const email = emails?.[0]?.value;

                if (!email) {
                    return done(new Error('Aucun email trouvé dans le profil Google'));
                }

                // Chercher l'utilisateur par google_id d'abord
                let utilisateur = await utilisateurRepository.findByGoogleId(google_id);

                // Si pas trouvé par google_id, chercher par email
                if (!utilisateur) {
                    utilisateur = await utilisateurRepository.findByEmail(email);

                    // Si trouvé par email mais pas de google_id, mettre à jour le google_id
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
                        mot_de_passe: null, // Les utilisateurs OAuth n'ont pas de mot de passe local
                    });
                }

                return done(null, utilisateur);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Sérialiser l'utilisateur pour la session
passport.serializeUser((utilisateur, done) => {
    done(null, utilisateur.id_utilisateur);
});

// Désérialiser l'utilisateur depuis la session
passport.deserializeUser(async (id, done) => {
    try {
        const utilisateur = await utilisateurRepository.findById(id);
        done(null, utilisateur);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
