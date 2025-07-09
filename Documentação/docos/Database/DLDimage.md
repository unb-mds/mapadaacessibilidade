# Modelo Físico MySQL

/_ Lógico_1_MAAC: _/

CREATE TABLE Usuario_Foto (
id VARCHAR(36) PRIMARY KEY,
nome VARCHAR(100),
email VARCHAR(100) UNIQUE,
papel ENUM('usuario', 'moderador', 'adm),
created DATETIME,
UPDATED DATETIME,
url VARCHAR(255),
status ENUM('pendente','aprovado','rejeitado'),
uploaded_at DATETIME,
fk_Local_id VARCHAR(36)
);

CREATE TABLE Local (
id VARCHAR(36) PRIMARY KEY,
nome VARCHAR(150),
descricao TEXT,
endereco VARCHAR(200),
latitude DECIMAL(10,8),
longitude DECIMAL(11,8),
status ENUM('pendente','aprovado'),
criado_por VARCHAR(36),
created_at DATETIME,
updated_at DATETIME,
fk_Usuario_Foto_id VARCHAR(36)
);

CREATE TABLE Acessibilidade (
id VARCHAR(36) PRIMARY KEY,
nome VARCHAR(50),
descricao TEXT
);

CREATE TABLE Avaliacao (
id VARCHAR(36) PRIMARY KEY,
nota TINYINT,
comentario TEXT,
created_at DATETIME,
fk_Usuario_Foto_id VARCHAR(36),
fk_Local_id VARCHAR(36)
);

CREATE TABLE TopicoDiscussao (
id VARCHAR(36) PRIMARY KEY,
iniciado_por VARCHAR(36),
titulo VARCHAR(200),
status ENUM('aberto','encerrado'),
created_at DATETIME,
updated_at DATETIME,
fk_Usuario_Foto_id VARCHAR(36),
fk_Local_id VARCHAR(36)
);

CREATE TABLE MensagemDiscussao (
id VARCHAR(36) PRIMARY KEY,
autor VARCHAR(36),
mensagem TEXT,
created_at DATETIME,
fk_Usuario_Foto_id VARCHAR(36),
fk_TopicoDiscussao_id VARCHAR(36)
);

CREATE TABLE Voto (
id VARCHAR(36) PRIMARY KEY,
prioridade ENUM('essencial','recomendavel','indiferente'),
created_at DATETIME,
fk_Usuario_Foto_id VARCHAR(36),
fk_Local_id VARCHAR(36),
fk_Acessibilidade_id VARCHAR(36)
);

CREATE TABLE Evento (
id VARCHAR(36) PRIMARY KEY,
nome VARCHAR(150),
descricao TEXT,
data_inicio DATETIME,
data_fim DATETIME,
created_at DATETIME,
fk_Local_id VARCHAR(36)
);

CREATE TABLE TokenRedefinicao (
usuario_id VARCHAR(36) PRIMARY KEY,
token VARCHAR(255),
expires_at DATETIME,
created_at DATETIME,
fk_Usuario_Foto_id VARCHAR(36)
);

ALTER TABLE Usuario_Foto ADD CONSTRAINT FK_Usuario_Foto_2
FOREIGN KEY (fk_Local_id)
REFERENCES Local (id)
ON DELETE CASCADE;

ALTER TABLE Local ADD CONSTRAINT FK_Local_2
FOREIGN KEY (fk_Usuario_Foto_id)
REFERENCES Usuario_Foto (id)
ON DELETE CASCADE;

ALTER TABLE Avaliacao ADD CONSTRAINT FK_Avaliacao_2
FOREIGN KEY (fk_Usuario_Foto_id)
REFERENCES Usuario_Foto (id)
ON DELETE CASCADE;

ALTER TABLE Avaliacao ADD CONSTRAINT FK_Avaliacao_3
FOREIGN KEY (fk_Local_id)
REFERENCES Local (id)
ON DELETE RESTRICT;

ALTER TABLE TopicoDiscussao ADD CONSTRAINT FK_TopicoDiscussao_2
FOREIGN KEY (fk_Usuario_Foto_id)
REFERENCES Usuario_Foto (id)
ON DELETE CASCADE;

ALTER TABLE TopicoDiscussao ADD CONSTRAINT FK_TopicoDiscussao_3
FOREIGN KEY (fk_Local_id)
REFERENCES Local (id)
ON DELETE CASCADE;

ALTER TABLE MensagemDiscussao ADD CONSTRAINT FK_MensagemDiscussao_2
FOREIGN KEY (fk_Usuario_Foto_id)
REFERENCES Usuario_Foto (id)
ON DELETE CASCADE;

ALTER TABLE MensagemDiscussao ADD CONSTRAINT FK_MensagemDiscussao_3
FOREIGN KEY (fk_TopicoDiscussao_id)
REFERENCES TopicoDiscussao (id)
ON DELETE CASCADE;

ALTER TABLE Voto ADD CONSTRAINT FK_Voto_2
FOREIGN KEY (fk_Usuario_Foto_id)
REFERENCES Usuario_Foto (id)
ON DELETE CASCADE;

ALTER TABLE Voto ADD CONSTRAINT FK_Voto_3
FOREIGN KEY (fk_Local_id)
REFERENCES Local (id)
ON DELETE CASCADE;

ALTER TABLE Voto ADD CONSTRAINT FK_Voto_4
FOREIGN KEY (fk_Acessibilidade_id)
REFERENCES Acessibilidade (id)
ON DELETE CASCADE;

ALTER TABLE Evento ADD CONSTRAINT FK_Evento_2
FOREIGN KEY (fk_Local_id)
REFERENCES Local (id)
ON DELETE SET NULL;

ALTER TABLE TokenRedefinicao ADD CONSTRAINT FK_TokenRedefinicao_2
FOREIGN KEY (fk_Usuario_Foto_id)
REFERENCES Usuario_Foto (id)
ON DELETE CASCADE;
