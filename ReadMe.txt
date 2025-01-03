création d'un Rest api avec node, express,typescript et maongoDB
 plus l'authentification

 étape1: initialisaton du projet avec "npm init"
 étape2: Installation des dependances dev {
    1.npm i -D typescript,
    2.npm i -D ts-node
    3.npm i -D @types/node,
    4. npm i nodemon
 }
 étape3: Configuration et création du fichier tsconfig.json
 dans le fichier tsconfig.json ajoute ce bloc de code json [
{
    "compilerOptions": {
        "module": "NodeNext",
        "baseUrl": "src",
        "outDir": "dist",
        "sourceMap": true,
        "noImplicitAny": true,
        "target": "ES2020", 
        "strict": true, 
        "esModuleInterop": true, 
        "skipLibCheck": true, 
        "forceConsistentCasingInFileNames": true
}, 
    "include": ["src"], 
    "exclude": ["node_modules"]
    
}
 ]

étape4: création d'un fichier nodemon.json pour ajouter cette configuratrion [
   {
 {
    "watch": ["src"],
    "ext": "ts",
    "exec": "ts-node ./src/index.ts"
}

}
]

étape5: Installation des outils à utiliser pour la création de L'api , dans ce projet si je vais utiliser:
 npm i express cors body-parser cookie-parser compression 
 npm install dotenv

puis convertir ces outils en typescript avec la commande @types/
dans mon cas : npm i -D @types/express @types/cors @types/body-parser @types/cookie-parser @types/compression
 et enfin maintenant commençant par la création du server 

 JmosxpFJ1Ik3GNSt: mdp mongo
 mongodb+srv://lawalrafiou2:JmosxpFJ1Ik3GNSt@cluster0.e4laf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 mongodb+srv://lawalrafiou2:<db_password>@cluster0.e4laf.mongodb.net/

















 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authentication System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        h1 {
            color: #333;
        }
        .container {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 300px;
        }
        form {
            display: flex;
            flex-direction: column;
        }
        label {
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="text"], input[type="password"] {
            margin-bottom: 15px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            padding: 10px;
            background: #007BFF;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background: #0056b3;
        }
        .message {
            margin-top: 10px;
            color: green;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Authentication System</h1>
    <div class="container">
        <form id="authForm">
            <label for="username">Username</label>
            <input type="text" id="username" required>
            
            <label for="password">Password</label>
            <input type="password" id="password" required>
            
            <button type="submit">Login</button>
        </form>
        <div id="message" class="message"></div>
    </div>

    <script>
        const form = document.getElementById('authForm');
        const messageDiv = document.getElementById('message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Send login request
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.text();
            if (response.ok) {
                messageDiv.textContent = result;
                messageDiv.className = 'message';
            } else {
                messageDiv.textContent = result;
                messageDiv.className = 'error';
            }
        });
    </script>
</body>
</html>





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8f9fa;
            margin: 0;
            padding: 0;
        }
        .navbar {
            background: #343a40;
            padding: 10px 20px;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .navbar h1 {
            margin: 0;
            font-size: 20px;
        }
        .navbar button {
            background: #007bff;
            color: #fff;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        .navbar button:hover {
            background: #0056b3;
        }
        .container {
            padding: 20px;
        }
        .card {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .card h2 {
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="navbar">
        <h1>Admin Panel</h1>
        <button id="logout">Logout</button>
    </div>
    <div class="container">
        <div class="card">
            <h2>Bienvenue, Admin</h2>
            <p>Vous êtes connecté avec succès à l'interface admin.</p>
        </div>
    </div>

    <script>
        const logoutBtn = document.getElementById('logout');

        logoutBtn.addEventListener('click', async () => {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
            });

            if (response.ok) {
                alert('Vous avez été déconnecté avec succès.');
                window.location.href = '/';
            } else {
                alert('Erreur lors de la déconnexion.');
            }
        });
    </script>
</body>
</html>


