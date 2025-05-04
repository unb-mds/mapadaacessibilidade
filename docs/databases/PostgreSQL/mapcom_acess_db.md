<div align="center">
<h1>Estrutura do Banco de Dados</h1>
</div>

<div align="center">
<img src="https://github.com/user-attachments/assets/9716d39a-23a9-4b02-8871-8d72d08fa3c7" height="350px" width="400px">
</div>

<div align="center">
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
</div>

## `OBJETIVO`

O objetivo deste banco de dados é gerenciar informações relacionadas a uma plataforma colaborativa que permite aos usuários cadastrar, avaliar e discutir sobre locais, com foco em acessibilidade para os diversos públicos, explorando recursos geoespaciais. Ele organiza dados de usuários, locais, fotos, avaliações, tópicos de discussão, mensagens, eventos e recursos de acessibilidade, garantindo integridade, rastreamento de alterações e suporte a consultas geográficas por meio da extensão PostGIS (PostGreSQL).


## Tabela `Usuario`

A tabela `Usuario` armazena os dados dos usuários da plataforma. Ela inclui informações como `id`, `nome`, `email`, `senha` (hash), `papel` (tipo de usuário) e timestamps para controle de criação e atualização.

### Estrutura da Tabela

```sql
CREATE TABLE Usuario (
  id UUID PRIMARY KEY, -- Identificador único universal para cada usuário.
  nome VARCHAR(100) NOT NULL, -- Nome do usuário, obrigatório.
  email VARCHAR(100) UNIQUE NOT NULL, -- Email único e obrigatório.
  senha_hash VARCHAR(255) NOT NULL, -- Hash da senha, obrigatório.
  papel VARCHAR(20) NOT NULL CHECK (papel IN ('usuario','moderador','adm')), -- Tipo de usuário, com valores restritos.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de criação.
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Data de última atualização.
);
```

### Considerações 


`UUID` é usado para garantir unicidade e escalabilidade.
Controle de integridade com `CHECK` para os papéis de usuário.
Campos `created_at` e `updated_at` para rastrear alterações.


## Tabela `Local`
A tabela `Local` armazena os dados dos locais cadastrados pelos usuários. Inclui informações como `id`, `nome`, `descrição`, `tipo`, `endereço`, `cidade`, `bairro`, `estado`, `coordenadas geográficas (latitude e longitude)`, `status (pendente ou aprovado) e referências a usuários`.

### Estrutura da Tabela

```sql
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE Local (
  id UUID PRIMARY KEY, -- Identificador único universal para cada local.
  nome VARCHAR(150) NOT NULL, -- Nome do local, obrigatório.
  descricao TEXT, -- Descrição do local.
  tipo VARCHAR(30), -- Tipo do local.
  endereco VARCHAR(200), -- Endereço do local.
  cidade VARCHAR(100), -- Cidade do local.
  bairro VARCHAR(100), -- Bairro do local.
  estado VARCHAR(100), -- Estado do local.
  latitude DECIMAL(10,8), -- Latitude do local.
  longitude DECIMAL(11,8), -- Longitude do local.
  geolocalizacao geometry(Point,4326), -- Geolocalização no formato PostGIS.
  status VARCHAR(20) NOT NULL CHECK (status IN ('pendente','aprovado')), -- Status do local.
  criado_por UUID NOT NULL, -- Referência ao usuário que criou o local.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de criação.
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de última atualização.
  CONSTRAINT fk_local_usuario FOREIGN KEY (criado_por) REFERENCES Usuario(id) ON DELETE CASCADE -- Chave estrangeira para a tabela Usuario.
);
```
Considerações
* PostGIS é usado para manipulação de dados geoespaciais.
* Controle de integridade com CHECK para o status do local.
* Relacionamento com a tabela Usuario para rastrear o criador do local.

## Tabela `Foto`
A tabela `Foto` armazena os dados das fotos enviadas pelos usuários. Inclui informações como `id`, `URL da foto`, `status (pendente, aprovado ou rejeitado)`, `data de upload` e `referências` a `usuários` e `locais`.

Estrutura da Tabela

```sql
CREATE TABLE Foto (
  id UUID PRIMARY KEY, -- Identificador único universal para cada foto.
  url VARCHAR(255) NOT NULL, -- URL da foto, obrigatório.
  status VARCHAR(20) NOT NULL CHECK (status IN ('pendente','aprovado','rejeitado')), -- Status da foto.
  uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de upload.
  fk_usuario_id UUID NOT NULL, -- Referência ao usuário que enviou a foto.
  fk_local_id UUID NOT NULL, -- Referência ao local relacionado à foto.
  CONSTRAINT fk_foto_usuario FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE, -- Chave estrangeira para a tabela Usuario.
  CONSTRAINT fk_foto_local FOREIGN KEY (fk_local_id) REFERENCES Local(id) ON DELETE CASCADE -- Chave estrangeira para a tabela Local.
);
```

## Tabela `Acessibilidade`

A tabela `Acessibilidade` armazena os dados sobre acessibilidade dos locais cadastrados pelos usuários. Inclui informações como `id`, `nome` e `descrição`.

```sql
CREATE TABLE Acessibilidade (
  id UUID PRIMARY KEY, -- Identificador único universal para cada recurso de acessibilidade.
  nome VARCHAR(50) NOT NULL, -- Nome do recurso de acessibilidade, obrigatório.
  descricao TEXT -- Descrição do recurso de acessibilidade.
);
```

## Tabela `LocalAcessibilidade`
A tabela `LocalAcessibilidade` conecta as tabelas `Local` e `Acessibilidade`, registrando quais recursos de acessibilidade estão disponíveis em cada local.

Estrutura da Tabela

```sql
CREATE TABLE LocalAcessibilidade (
  local_id UUID NOT NULL, -- Referência ao ID na tabela Local.
  acessibilidade_id UUID NOT NULL, -- Referência ao ID na tabela Acessibilidade.
  presente BOOLEAN NOT NULL DEFAULT TRUE, -- Indica se o recurso está disponível.
  data_inclusao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de inclusão do recurso.
  PRIMARY KEY (local_id, acessibilidade_id), -- Chave primária composta.
  CONSTRAINT fk_la_local FOREIGN KEY (local_id) REFERENCES Local(id) ON DELETE CASCADE, -- Chave estrangeira para a tabela Local.
  CONSTRAINT fk_la_acessibil FOREIGN KEY (acessibilidade_id) REFERENCES Acessibilidade(id) ON DELETE CASCADE -- Chave estrangeira para a tabela Acessibilidade.
);
```

## Tabela `Avaliacao`
A tabela `Avaliacao` armazena as avaliações feitas pelos usuários sobre os locais cadastrados. Cada avaliação inclui uma nota, um comentário opcional e referências ao usuário e ao local avaliados.

**Estrutura da Tabela:**

```sql
CREATE TABLE Avaliacao (
  id UUID PRIMARY KEY, -- Identificador único universal para cada avaliação.
  nota SMALLINT NOT NULL CHECK (nota BETWEEN 1 AND 5), -- Nota da avaliação (1 a 5).
  comentario TEXT, -- Comentário opcional.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de criação da avaliação.
  fk_usuario_id UUID NOT NULL, -- Referência ao usuário que fez a avaliação.
  fk_local_id UUID NOT NULL, -- Referência ao local avaliado.
  CONSTRAINT fk_av_usr FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE, -- Chave estrangeira para a tabela Usuario.
  CONSTRAINT fk_av_loc FOREIGN KEY (fk_local_id) REFERENCES Local(id) ON DELETE CASCADE, -- Chave estrangeira para a tabela Local.
  CONSTRAINT uq_avaliacao UNIQUE (fk_usuario_id, fk_local_id) -- Garante que um usuário avalie um local apenas uma vez.
);
```
## Tabela `TopicoDiscussao`
A tabela TopicoDiscussao armazena tópicos de discussão criados pelos usuários sobre os locais. Cada tópico possui um título, uma categoria e um status.

```sql
CREATE TABLE TopicoDiscussao (
  id UUID PRIMARY KEY, -- Identificador único universal para cada tópico.
  titulo VARCHAR(200) NOT NULL, -- Título do tópico.
  categoria VARCHAR(30), -- Categoria do tópico.
  status VARCHAR(20) NOT NULL CHECK (status IN ('aberto','encerrado')), -- Status do tópico.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de criação.
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de última atualização.
  fk_usuario_id UUID NOT NULL, -- Referência ao usuário que criou o tópico.
  fk_local_id UUID NOT NULL, -- Referência ao local relacionado ao tópico.
  CONSTRAINT fk_td_usr FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE, -- Chave estrangeira para a tabela Usuario.
  CONSTRAINT fk_td_loc FOREIGN KEY (fk_local_id) REFERENCES Local(id) ON DELETE CASCADE -- Chave estrangeira para a tabela Local.
);
```

## Tabela `MensagemDiscussao`
A tabela MensagemDiscussao armazena mensagens enviadas pelos usuários em tópicos de discussão.

```sql
CREATE TABLE MensagemDiscussao (
  id UUID PRIMARY KEY, -- Identificador único universal para cada mensagem.
  mensagem TEXT NOT NULL, -- Conteúdo da mensagem.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de envio da mensagem.
  fk_usuario_id UUID NOT NULL, -- Referência ao usuário que enviou a mensagem.
  fk_topico_discussao_id UUID NOT NULL, -- Referência ao tópico de discussão.
  CONSTRAINT fk_md_usr FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE, -- Chave estrangeira para a tabela Usuario.
  CONSTRAINT fk_md_top FOREIGN KEY (fk_topico_discussao_id) REFERENCES TopicoDiscussao(id) ON DELETE CASCADE -- Chave estrangeira para a tabela TopicoDiscussao.
);
```
## Tabela `Voto`
A tabela `Voto` armazena votos dos usuários sobre a prioridade de recursos de acessibilidade em locais.

```sql
CREATE TABLE Voto (
  id UUID PRIMARY KEY, -- Identificador único universal para cada voto.
  prioridade VARCHAR(20) NOT NULL CHECK (prioridade IN ('essencial','recomendavel','indiferente')), -- Prioridade atribuída.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data do voto.
  fk_usuario_id UUID NOT NULL, -- Referência ao usuário que votou.
  fk_local_id UUID NOT NULL, -- Referência ao local votado.
  fk_acessibilidade_id UUID NOT NULL, -- Referência ao recurso de acessibilidade votado.
  CONSTRAINT fk_voto_usr FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE, -- Chave estrangeira para a tabela Usuario.
  CONSTRAINT fk_voto_loc FOREIGN KEY (fk_local_id) REFERENCES Local(id) ON DELETE CASCADE, -- Chave estrangeira para a tabela Local.
  CONSTRAINT fk_voto_acc FOREIGN KEY (fk_acessibilidade_id) REFERENCES Acessibilidade(id) ON DELETE CASCADE -- Chave estrangeira para a tabela Acessibilidade.
);
```

## Tabela `Evento`
A tabela `Evento` armazena eventos relacionados aos locais cadastrados.

Estrutura da Tabela:

```sql
CREATE TABLE Evento (
  id UUID PRIMARY KEY, -- Identificador único universal para cada evento.
  nome VARCHAR(150) NOT NULL, -- Nome do evento.
  descricao TEXT, -- Descrição do evento.
  data_inicio TIMESTAMP, -- Data de início do evento.
  data_fim TIMESTAMP, -- Data de término do evento.
  status VARCHAR(20) NOT NULL CHECK (status IN ('planejado','em_andamento','concluido')), -- Status do evento.
  url_externa VARCHAR(255), -- URL externa para mais informações.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de criação.
  fk_local_id UUID, -- Referência ao local relacionado ao evento.
  CONSTRAINT fk_evt_loc FOREIGN KEY (fk_local_id) REFERENCES Local(id) ON DELETE SET NULL -- Chave estrangeira para a tabela Local.
);
```

## Tabela `TokenRedefinicao`
A tabela `TokenRedefinicao` armazena tokens para redefinição de senha dos usuários.

Estrutura da Tabela:

```sql
CREATE TABLE TokenRedefinicao (
  usuario_id UUID PRIMARY KEY, -- Referência ao usuário.
  token VARCHAR(255) NOT NULL, -- Token de redefinição.
  expires_at TIMESTAMP, -- Data de expiração do token.
  used_at TIMESTAMP, -- Data de uso do token.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de criação do token.
  CONSTRAINT fk_tr_usr FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE -- Chave estrangeira para a tabela Usuario.
);
```

## Tabela `LocalHistory`
A tabela `LocalHistory` armazena o histórico de alterações realizadas nos locais.

**Estrutura da Tabela:**
```sql
CREATE TABLE LocalHistory (
  history_id UUID PRIMARY KEY, -- Identificador único para cada registro de histórico.
  local_id UUID NOT NULL, -- Referência ao local alterado.
  usuario_id UUID NOT NULL, -- Referência ao usuário que realizou a alteração.
  acao VARCHAR(50) NOT NULL, -- Ação realizada (ex.: "criação", "edição").
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data e hora da alteração.
  CONSTRAINT fk_lh_loc FOREIGN KEY (local_id) REFERENCES Local(id) ON DELETE CASCADE, -- Chave estrangeira para a tabela Local.
  CONSTRAINT fk_lh_usr FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE -- Chave estrangeira para a tabela Usuario.
);
```

## Extensão PostGIS

A extensão **PostGIS** adiciona suporte a dados geoespaciais no PostgreSQL. Ela permite armazenar, consultar e manipular informações geográficas, como coordenadas, polígonos e pontos. No contexto deste banco de dados, a extensão é usada para armazenar a localização geográfica dos locais cadastrados, utilizando o tipo de dado `geometry(Point,4326).`

## CONSULTAS REALIZADAS

_As seguintes consultas foram realizadas como "teste" para verificar o funcionamento do banco de dados, sendo passíveis de atualizações a depender da necessidade do projeto._

### `LOCAL MAIS BEM AVALIADO`
Calcula a média de avaliações para cada local, ordenando pelos melhores avaliados.

```sql
SELECT 
    l.nome AS local,
    l.tipo,
    ROUND(AVG(a.nota), 2) AS media_avaliacao,
    COUNT(a.id) AS total_avaliacoes
FROM 
    Local l
LEFT JOIN 
    Avaliacao a ON l.id = a.fk_local_id
GROUP BY 
    l.id
ORDER BY 
    media_avaliacao DESC NULLS LAST, total_avaliacoes DESC;
```


Vamos analisar cada parte:

**SELEÇÃO DE COLUNAS**

```sql
SELECT 
    l.nome AS local,
    l.tipo,
    ROUND(AVG(a.nota), 2) AS media_avaliacao,
    COUNT(a.id) AS total_avaliacoes
```
* `l.nome AS local`: Seleciona o nome do local e renomeia a coluna como "local"

* `l.tipo`: Seleciona o tipo do local (parque, museu, etc.)

* `ROUND(AVG(a.nota), 2) AS media_avaliacao`: Calcula a média das notas e arredonda para 2 casas decimais

* `COUNT(a.id) AS total_avaliacoes`: Conta quantas avaliações cada local recebeu

**ORIGEM DOS DADOS SQL**

```sql
FROM 
    Local l
LEFT JOIN 
    Avaliacao a ON l.id = a.fk_local_id
```

* `FROM Local l`: Começa com a tabela de Locais (apelidada de 'l')

* `LEFT JOIN Avaliacao a`: Faz um join com a tabela de Avaliações (apelidada de 'a')

* `ON l.id = a.fk_local_id`: Conecta os locais com suas avaliações através do ID

**AGRUPAMENTO**

```sql
GROUP BY 
    l.id
```
* Agrupa os resultados pelo ID do local, para que as funções de agregação (AVG, COUNT) sejam calculadas por local

**ORDENAÇÃO**

```sql
ORDER BY 
    media_avaliacao DESC NULLS LAST, 
    total_avaliacoes DESC
```

`media_avaliacao DESC`: Ordena pela média de avaliação (maiores primeiro)

`NULLS LAST`: Coloca locais sem avaliações no final

`total_avaliacoes DESC`: Em caso de empate, ordena pelo maior número de avaliações

<ins>**FUNCIONAMENTO DA CONSULTA**</ins>

* Primeiro pega todos os locais (mesmo os sem avaliações, graças ao LEFT JOIN)

* Para cada local, calcula a média das notas e conta as avaliações

* Agrupa os resultados por local

* Ordena primeiro pela melhor média, depois pelo maior volume de avaliações

* Locais sem avaliações aparecem no final com média NULL

<div align="center">
<img src="https://github.com/user-attachments/assets/37a91149-9b27-47fb-b8ac-dc1f60e4468e" height="200px" width="500px">
</div>

## 🔍 Consulta: Buscar locais próximos usando `PostGIS`

```sql
SELECT 
  nome, 
  endereco, 
  ST_Distance(
    geolocalizacao, 
    ST_SetSRID(ST_MakePoint(-47.8825, -15.7942), 4326)
  ) AS distancia_metros
FROM 
  Local
WHERE 
  ST_DWithin(
    geolocalizacao, 
    ST_SetSRID(ST_MakePoint(-47.8825, -15.7942), 4326), 
    1000
  )
ORDER BY 
  distancia_metros;
```
🧾 Explicação linha por linha

* `SELECT nome, endereco,` ...
Seleciona as colunas nome e endereco da tabela Local para exibir os locais encontrados.

* `ST_Distance(...)` AS distancia_metros
Calcula a distância em metros entre a geolocalização de cada local e o ponto de referência fornecido (latitude: -15.7942, longitude: -47.8825).

* `ST_Distance(geom1, geom2)` retorna a distância entre dois pontos geográficos.

* `AS distancia_metros` dá um nome legível à coluna resultante.

* `FROM Local`
Indica que os dados virão da tabela Local.

* `WHERE ST_DWithin(...)`
Filtra os locais para que apenas aqueles dentro de um raio de 1000 metros (1 km) do ponto fornecido sejam retornados.

* `ST_DWithin(geom1, geom2, raio)` retorna `TRUE` se a distância entre os dois pontos for menor ou igual ao raio especificado.

* `ST_SetSRID(ST_MakePoint(...), 4326)` 
Cria o ponto de referência a partir das coordenadas `(-47.8825, -15.7942)` e define seu sistema de referência geográfica `(SRID 4326)`, que é o padrão para coordenadas `GPS (latitude/longitude)`.

* `ORDER BY distancia_metros`
Ordena os resultados pela distância do ponto de referência, do mais próximo para o mais distante.

🗺️ **Observação:**

* Essa consulta depende da extensão PostGIS estar ativa no PostgreSQL (`CREATE EXTENSION postgis;`).

* Substitua as coordenadas para buscar locais próximos a um ponto diferente.

<ins>**FUNCIONAMENTO DA CONSULTA**</ins>

<div align="center">
<img src="https://github.com/user-attachments/assets/bb7aa684-10b5-4386-bbcd-058ee48213da" height="200px" width="500px">
</div>

## 🔍 Consulta: Usuários com papel de moderador ou adm

```sql
SELECT 
  nome, 
  email, 
  papel, 
  created_at
FROM 
  Usuario
WHERE 
  papel IN ('moderador', 'adm');
```

🧾 Explicação linha por linha

* Essas informações são úteis para identificar e auditar os usuários com funções privilegiadas no sistema.

* `FROM Usuario
`
Define que os dados serão extraídos da tabela Usuario, que armazena os dados de todas as pessoas cadastradas no sistema.

* `WHERE papel IN ('moderador', 'adm')`
Filtra os registros para retornar apenas aqueles cujo papel (papel) seja moderador ou adm.

* A cláusula `IN` verifica se o valor da coluna está contido na lista fornecida.

🛡️ Observação:

* Os papéis `moderador` e `adm` geralmente possuem permissões elevadas, como aprovação de conteúdo, gestão de usuários ou locais.

* Esse tipo de consulta é essencial para auditorias, gerenciamento de permissões e painéis administrativos.

<ins>**FUNCIONAMENTO DA CONSULTA**</ins>

<div align="center">
<img src="https://github.com/user-attachments/assets/456f0129-e788-4aed-ac7f-e8b3b396aad7" height="150px" width="500px">
</div>

## 📅 Consulta: Eventos em andamento

```sql
SELECT 
  nome, 
  descricao, 
  data_inicio, 
  data_fim
FROM 
  Evento
WHERE 
  CURRENT_DATE BETWEEN data_inicio::date AND data_fim::date
  AND status = 'em_andamento';

🧾 Explicação:
SELECT nome, descricao, data_inicio, data_fim: --seleciona os campos principais da tabela Evento para listar os eventos em andamento com nome, descrição e datas de início e fim.

FROM Evento: -- indica que os dados estão sendo extraídos da tabela Evento, onde os eventos do sistema são armazenados.

WHERE CURRENT_DATE BETWEEN data_inicio::date AND data_fim::date: -- verifica se a data atual (CURRENT_DATE) está dentro do intervalo entre data_inicio e data_fim. O uso de ::date força a comparação apenas pelas datas (ignorando horas).

AND status = 'em_andamento': -- garante que somente eventos com o status marcado como 'em_andamento' sejam retornados.
```

Esta consulta é útil para listar eventos que estão ocorrendo no momento em tempo real, facilitando o monitoramento e exibição dinâmica no sistema.

<ins>**FUNCIONAMENTO DA CONSULTA**</ins>

<div align="center">
<img src="https://github.com/user-attachments/assets/cd57a2f8-2dfb-4420-8367-98c0672de405" height="100px" width="500px">
</div>

## 📸 Consulta: Fotos pendentes de aprovação!


```sql
SELECT 
  f.id, 
  f.url, 
  f.uploaded_at, 
  u.nome AS usuario_nome, 
  l.nome AS local_nome
FROM 
  Foto f
JOIN 
  Usuario u ON f.fk_usuario_id = u.id
JOIN 
  Local l ON f.fk_local_id = l.id
WHERE 
  f.status = 'pendente';
```

🧾 Explicação:

* `SELECT f.id`, `f.url`, `f.uploaded_at`, `u.nome` `AS usuario_nome`, `l.nome AS local_nome`: seleciona o ID da foto, sua URL, a data de envio e também os nomes do usuário e do local relacionados a cada foto.

* `FROM Foto f`: define que os dados serão obtidos da tabela `Foto`, usando o alias `f` para facilitar a referência.

* `JOIN Usuario u ON f.fk_usuario_id` = `u.id:` faz um join com a tabela Usuario para obter o nome do usuário que enviou a foto.

* `JOIN Local l ON f.fk_local_id = l.id`: faz um join com a tabela Local para trazer o nome do local associado à foto.

* `WHERE f.status = 'pendente'`: filtra os resultados para retornar apenas as fotos que ainda estão pendentes de aprovação.

Esta consulta é útil para moderadores identificarem facilmente quais imagens aguardam validação no sistema, exibindo também quem as enviou e a que local estão associadas.

<ins>**FUNCIONAMENTO DA CONSULTA**</ins>

<div align="center">
<img src="https://github.com/user-attachments/assets/0b8187bb-3bbc-492f-ac7c-4f3ade925fd8" height="100px" width="500px">
</div>


<ins>**OBSERVAÇÕES**</ins>

A seguinte estrutura pode passar por alterações futuras e melhorias a depender da necessidade do projeto e com as correções necessárias.

<div align="center">
<footer>
  &copy; Mapa da Acessibilidade - All Rights Reserved
</footer>
</div>
