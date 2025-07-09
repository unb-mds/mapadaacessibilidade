![capa da seção de funcionalidades](./assets/capa_funcionalidades.png)

## Funcionalidades Principais

### 1. Página Inicial (Home)
**Arquivos**: `Home.jsx`, `Home.css`

A página inicial apresenta:
- **Hero Section**: Apresentação da missão e objetivos do projeto
- **Mapa Interativo**: Visualização dos locais cadastrados usando Leaflet API
- **Filtros de Acessibilidade**: Busca por tipo de acessibilidade (rampa, piso tátil, banheiro adaptado)
- **Busca por Região**: Localização de espaços acessíveis por área geográfica
- **Apresentação da Equipe**: Perfis dos desenvolvedores e suas especialidades

**Características técnicas**:
- Integração com API de mapas Leaflet
- Sistema de filtros dinâmicos
- Responsividade para diferentes dispositivos
- Carregamento otimizado de dados dos locais

### 2. Sistema de Autenticação

#### Login (`Login.jsx`, `Login.css`)
- Formulário de acesso com validação
- Integração com backend para autenticação
- Recuperação de senha
- Redirecionamento pós-login

#### Cadastro (`Cadastro.jsx`, `Cadastro.css`)
- Formulário de registro de novos usuários
- Validação de dados em tempo real
- Termos de uso e política de privacidade
- Confirmação de email

### 3. Gestão de Locais

#### Detalhes do Local (`Local.jsx`, `Local.css`)
- Visualização completa das informações do local
- **Avaliações e Comentários**: Sistema colaborativo de feedback
- **Galeria de Imagens**: Upload e visualização de fotos
- **Informações de Acessibilidade**: Detalhamento completo dos recursos
- **Localização no Mapa**: Integração com coordenadas GPS

#### Adicionar Local
- Formulário para cadastro de novos locais
- Upload de imagens
- Seleção de recursos de acessibilidade
- Validação de dados geográficos

### 4. Eventos de Acessibilidade (`Eventos.jsx`, `Eventos.css`)
- **Listagem de Eventos**: Calendário de atividades comunitárias
- **Filtros por Data e Tipo**: Busca personalizada
- **Detalhes do Evento**: Informações completas sobre acessibilidade
- **Participação**: Sistema de confirmação de presença

### 5. Suporte e Informações

#### FAQ (`FAQ.jsx`, `FAQ.css`)
- **Perguntas Frequentes**: Seção organizada por categorias
- **Como Usar**: Guia passo a passo da plataforma
- **Funcionalidades**: Explicação detalhada dos recursos
- **Busca Inteligente**: Localização rápida de respostas

#### Contato (`Contato.jsx`, `Contato.css`)
- **Formulário de Contato**: Comunicação direta com a equipe
- **Informações da Equipe**: Perfis e especialidades
- **Canais de Comunicação**: Email, telefone e redes sociais
- **Suporte Técnico**: Relato de problemas e sugestões

#### Sobre (`Sobre.jsx`, `Sobre.css`)
- **Missão e Visão**: Apresentação do projeto
- **Equipe de Desenvolvimento**: Perfis detalhados
- **Tecnologias Utilizadas**: Stack técnico
- **Histórico do Projeto**: Evolução e marcos

## Recursos de Acessibilidade

### Implementações Técnicas
- **Navegação por Teclado**: Suporte completo para usuários com deficiência visual
- **Leitores de Tela**: Compatibilidade com NVDA, JAWS e VoiceOver
- **Alto Contraste**: Opções de tema para baixa visão
- **Texto Alternativo**: Descrições em todas as imagens
- **Semântica HTML**: Estrutura adequada para tecnologias assistivas

### Padrões de Design
- **Cores Acessíveis**: Contraste adequado (WCAG 2.1)
- **Tipografia Legível**: Fontes e tamanhos apropriados
- **Espaçamento Adequado**: Áreas de toque e clique otimizadas
- **Feedback Visual**: Indicadores claros de estado e ações

## Integração com Backend

### APIs Consumidas
- **Autenticação**: Login, cadastro e gerenciamento de sessões
- **Locais**: CRUD completo de locais acessíveis
- **Eventos**: Gerenciamento de eventos comunitários
- **Avaliações**: Sistema de comentários e notas
- **Uploads**: Envio de imagens e arquivos

### Gerenciamento de Estado
- **Context API**: Gerenciamento global de estado do usuário
- **Local Storage**: Persistência de preferências do usuário
- **Cache**: Otimização de carregamento de dados

## Experiência do Usuário

### Fluxos Principais
1. **Descoberta**: Usuário acessa o mapa e explora locais
2. **Cadastro**: Registro na plataforma para colaborar
3. **Contribuição**: Adição de novos locais e avaliações
4. **Participação**: Engajamento em eventos comunitários

### Responsividade
- **Desktop**: Experiência completa com mapas expansivos
- **Tablet**: Interface adaptada para touch
- **Mobile**: Versão otimizada para uso em movimento
