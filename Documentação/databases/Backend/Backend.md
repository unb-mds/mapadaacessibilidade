<div align="center">
<img src="https://github.com/user-attachments/assets/da33dec0-288a-41da-b8d6-f7b4e27d513d" height="50px" width="50px">
</div>

<div align="center">
<h1>Documentação do Backend</h1>
</div>

<div align="center">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
</div>

## 📋 Visão Geral

Este documento detalha a arquitetura e lógica do sistema backend para a plataforma de geolocalização com autenticação JWT e recursos PostGIS.

## 🏗️ Estrutura do Projeto
backend/

├── config/

│ └── db.js # Configuração do PostgreSQL

├── controllers/

│ ├── auth.js # Lógica de autenticação

│ └── locations.js # Lógica de geolocalização

├── middlewares/

│ └── auth.js # Middleware de autenticação

├── models/

│ ├── User.js # Modelo de usuário

│ └── Location.js # Modelo de localização

├── routes/

│ ├── auth.js # Rotas de autenticação

│ └── locations.js # Rotas de geolocalização

├── utils/

│ └── geocoder.js # Integração com API de geocoding

└── app.js # Ponto de entrada principal


## 🔐 Sistema de Autenticação

### Modelo de Usuário
```javascript
// models/User.js
class User {
  static async create({ name, email, password }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const query = `
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING id, name, email`;
    // ...
  }
}
```
#### Fluxo de Registro:

Recebe dados do usuário

Gera hash da senha com bcrypt

Armazena no PostgreSQL

Retorna dados sem informações sensíveis

#### Controller de Autenticação

```javascript
// controllers/auth.js
exports.login = async (req, res) => {
  const user = await User.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
  
  res.json({ token });
};
```
## 🗺️ Sistema de Geolocalização
#### Modelo de Localização
```javascript
// models/Location.js
class Location {
  static async create({ lat, lng, userId }) {
    const query = `
      INSERT INTO locations (geom, user_id)
      VALUES (ST_SetSRID(ST_MakePoint($1, $2), 4326), $3)
      RETURNING *`;
    // ...
  }
}
```
#### Operações PostGIS:

ST_MakePoint: Cria ponto geográfico

ST_SetSRID: Define sistema de coordenadas (WGS84)

ST_DWithin: Filtra por raio de distância

#### Controller de Localização
```javascript
// controllers/locations.js
exports.getNearby = async (req, res) => {
  const { lat, lng, radius = 1000 } = req.query;
  
  const locations = await Location.findNearby(
    parseFloat(lat),
    parseFloat(lng),
    parseInt(radius)
  );
  
  res.json({ locations });
};
```
### 🔗 Rotas da API

#### Método	Endpoint	Descrição	Autenticação

POST	/api/auth/register -	Registro de novo usuário	

POST	/api/auth/login	- Login e obtenção de token JWT	

GET	/api/locations	- Listar locais próximos	

POST	/api/locations	- Criar novo local	

## 🛡️ Middleware de Autenticação

```javascript
// middlewares/auth.js
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
```
## 🌐 Integração com Frontend

#### Fluxo típico:

Frontend envia credenciais para /auth/login

Backend retorna token JWT

Frontend armazena token e envia em cabeçalhos subsequentes

Middleware valida token antes de acessar rotas protegidas

## 🚀 Como Executar

Configure variáveis de ambiente
bash
npm install
Inicie o servidor:
bash
node app.js
<div align="center"> <footer> &copy; 2023 Mapa da Acessibilidade - Todos os direitos reservados </footer> </div> 

