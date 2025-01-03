const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const { type } = require('os');
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'src')));

// Configurer les sessions
app.use(session({
    secret: 'my_secure_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false, // Mettre à true en production avec HTTPS
        sameSite: 'strict',
    },
}));

app.use((req, res, next) => {
    console.log('Session actuelle :', req.session);
    next();
}); 


// Route pour la page d'inscription
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'register.html'));
});

// Route pour la page de connexion
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
    
});

// Route pour la page de profil
app.get('/profile', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // Rediriger vers la connexion
    }
    res.sendFile(path.join(__dirname, 'src', 'profile.html'));
});

// app.get('/profile', (req, res) => {
//     if (!req.session || !req.session.userId) {
//         return res.status(401).send('Non autorisé. Veuillez vous connecter.');
//     }

//     res.send(`Bonjour ${req.session.userId}, bienvenue sur votre profil !`);
// });


// let sessionChecker = (req, res, next) => {
//     if (req.session.userId) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// } 

// Route pour la page admin
app.get('/admin', (req, res) => {
    if (!req.session.userId) {
        //res.status(401).send('Accès non autorisé. Veuillez vous connecter.');
        return res.redirect('/login'); // Rediriger vers la connexion
    }
    res.sendFile(path.join(__dirname, 'src', 'admin.html'));
});

// Simuler une base de données
const users = [
    { username: 'admin', password: await bcrypt.hash('admin123', 10) },
    { username: 'user1', password: await bcrypt.hash('user123', 10) },
    { username: 'user2', password: await bcrypt.hash('user234', 10) },
    { username: 'user3', password: await bcrypt.hash('user345', 10) },
];



// Route : Enregistrer un nouvel utilisateur
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('Utilisateur enregistré');
    console.log('user Inscrit avec succés', username , password)
});

// Route : Connexion
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Identifiants incorrects');
    }

    // Définir la session utilisateur
    req.session.userId = user.username; 
    res.send('Connexion réussie');
    console.log('Connexion réussie', username)
});


// Route : Déconnexion
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erreur lors de la déconnexion');
        }
        res.clearCookie('connect.sid');
        res.send('Déconnexion réussie');
    });
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
