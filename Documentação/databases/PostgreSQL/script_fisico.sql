-- Ativar extensão PostGIS para geolocalização
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Usuário
CREATE TABLE Usuario (
  id UUID PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  papel VARCHAR(20) NOT NULL CHECK (papel IN ('usuario','moderador','adm')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Local
CREATE TABLE Local (
  id UUID PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT,
  tipo VARCHAR(30),
  endereco VARCHAR(200),
  cidade VARCHAR(100),
  bairro VARCHAR(100),
  estado VARCHAR(100),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  geolocalizacao geometry(Point,4326),
  status VARCHAR(20) NOT NULL CHECK (status IN ('pendente','aprovado')),
  criado_por UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_local_usuario FOREIGN KEY (criado_por) REFERENCES Usuario(id) ON DELETE CASCADE
);

-- 3. Criar índice GIST para a coluna de geolocalização da tabela 'Local'
-- Isso permite buscas eficientes por localização (ex: distância, áreas, etc)
-- Índice geoespacial
CREATE INDEX idx_local_geolocalizacao ON Local USING GIST (geolocalizacao);

-- 4. Acessibilidade
CREATE TABLE Acessibilidade (
  id UUID PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao TEXT
);

-- 5. Tabela: LocalAcessibilidade (Relacionamento N:N entre Local e Acessibilidade)
CREATE TABLE LocalAcessibilidade (
  local_id UUID NOT NULL,
  acessibilidade_id UUID NOT NULL,
  presente BOOLEAN   NOT NULL DEFAULT TRUE,
  data_inclusao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (local_id, acessibilidade_id),
  CONSTRAINT fk_la_local FOREIGN KEY (local_id) REFERENCES Local(id) ON DELETE CASCADE,
  CONSTRAINT fk_la_acessibilidade FOREIGN KEY (acessibilidade_id) REFERENCES Acessibilidade(id) ON DELETE CASCADE
);

-- 6. Foto
CREATE TABLE Foto (
  id UUID PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pendente','aprovado','rejeitado')),
  uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fk_usuario_id UUID NOT NULL,
  fk_local_id UUID NOT NULL,
  CONSTRAINT fk_foto_usuario FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE,
  CONSTRAINT fk_foto_local   FOREIGN KEY (fk_local_id)   REFERENCES Local(id)   ON DELETE CASCADE
);

-- 7. Avaliacao
CREATE TABLE Avaliacao (
  id UUID PRIMARY KEY,
  nota SMALLINT NOT NULL CHECK (nota BETWEEN 1 AND 5),
  comentario TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fk_usuario_id UUID NOT NULL,
  fk_local_id UUID   NOT NULL,
  CONSTRAINT fk_av_usr FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE,
  CONSTRAINT fk_av_loc FOREIGN KEY (fk_local_id)   REFERENCES Local(id)   ON DELETE CASCADE,
  CONSTRAINT uq_avaliacao UNIQUE (fk_usuario_id, fk_local_id)
);

-- 8. TopicoDiscussao
CREATE TABLE TopicoDiscussao (
  id UUID PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  categoria VARCHAR(30),
  status VARCHAR(20) NOT NULL CHECK (status IN ('aberto','encerrado')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fk_usuario_id UUID NOT NULL,
  fk_local_id UUID   NOT NULL,
  CONSTRAINT fk_td_usr FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE,
  CONSTRAINT fk_td_loc FOREIGN KEY (fk_local_id)   REFERENCES Local(id)   ON DELETE CASCADE
);

-- 9. MensagemDiscussao
CREATE TABLE MensagemDiscussao (
  id UUID PRIMARY KEY,
  mensagem TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fk_usuario_id UUID        NOT NULL,
  fk_topico_discussao_id UUID NOT NULL,
  CONSTRAINT fk_md_usr  FOREIGN KEY (fk_usuario_id)           REFERENCES Usuario(id)          ON DELETE CASCADE,
  CONSTRAINT fk_md_top  FOREIGN KEY (fk_topico_discussao_id) REFERENCES TopicoDiscussao(id) ON DELETE CASCADE
);

-- 10. Voto
CREATE TABLE Voto (
  id UUID PRIMARY KEY,
  prioridade VARCHAR(20) NOT NULL CHECK (prioridade IN ('essencial','recomendavel','indiferente')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fk_usuario_id UUID        NOT NULL,
  fk_local_id UUID          NOT NULL,
  fk_acessibilidade_id UUID NOT NULL,
  CONSTRAINT fk_voto_usr  FOREIGN KEY (fk_usuario_id)           REFERENCES Usuario(id)          ON DELETE CASCADE,
  CONSTRAINT fk_voto_loc  FOREIGN KEY (fk_local_id)             REFERENCES Local(id)            ON DELETE CASCADE,
  CONSTRAINT fk_voto_acc  FOREIGN KEY (fk_acessibilidade_id)    REFERENCES Acessibilidade(id)   ON DELETE CASCADE
);

-- 11. Evento
CREATE TABLE Evento (
  id UUID PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT,
  data_inicio TIMESTAMP,
  data_fim TIMESTAMP,
  status VARCHAR(20) NOT NULL CHECK (status IN ('planejado','em_andamento','concluido')),
  url_externa VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fk_local_id UUID,
  CONSTRAINT fk_evt_loc FOREIGN KEY (fk_local_id) REFERENCES Local(id) ON DELETE SET NULL
);

-- 12. TokenRedefinicao
CREATE TABLE TokenRedefinicao (
  usuario_id UUID PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP,
  used_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tr_usr FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE
);

-- 13. LocalHistory
CREATE TABLE LocalHistory (
  history_id UUID PRIMARY KEY,
  local_id UUID     NOT NULL,
  usuario_id UUID   NOT NULL,
  acao VARCHAR(50)  NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_lh_loc FOREIGN KEY (local_id)   REFERENCES Local(id)    ON DELETE CASCADE,
  CONSTRAINT fk_lh_usr FOREIGN KEY (usuario_id) REFERENCES Usuario(id)   ON DELETE CASCADE
);
