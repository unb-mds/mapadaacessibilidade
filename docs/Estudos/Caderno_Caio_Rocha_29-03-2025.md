# Este será meu caderno de estudos para o Projeto de MDS.

Estudos iniciais para o dia 29/03/2025:
   - Organização de Software.
   - Git.
   - Arquiteturas de software (inicialmente MVC).

   ! Este caderno está sendo escrito utilizando a IDE PyCharm Professional da empresa JetBrains.
   

# Arquitetura de Software MVC:

- O que é uma arquitetura de software?
  - Conjunto de normas, técnicas e princípios utilizadas para construção de software.
- Como a arquitetura MCP funciona?
  - Esta arquitetura se é separada em 3 camadas:
    - Interação de usuário (view), camada de manipulação de dados (model) e de camada de controle (controller), uma formatação da arquitetura pode ser encontrada em Imagens\Imagem_1.png.
  - O usuário acessa o programa e passa pelo Controller, que responderá conforme programado (por exemplo, caso o usuário seja banido, o controller responderá ao não permitir o usuário utilizar o site, este processo se passa pelo Model) → passando disso, o usuário passa para view, onde serão renderizados os dados necessários para a utilização do sistema e onde os eventos ocorrerão → model é quem manipula os dados de acesso neste exemplo e interage diretamente com o banco de dados para tal.
- Quais seus benefícios?
  - Esta arquitetura é extremamente maleável e testável, além de ser escalável e facilita o gerenciamento de complexidade, sendo majoritariamente orientado a objeto.
- Quais seus malefícios?
  - O acoplamento de componentes pode gerar uma complexidade a mais para o código, além de torná-lo menos legível, o número de classes pode ficar enorme, dependendo do projeto, e ele não é recomendado para pequenas aplicações.
- Como implementar?
  - Utilizando uma organização orientada a objetos, pode-se criar uma arquitetura MVC organicamente, sem maiores complicações

# Organização de software:

Uma boa arquitetura de software garante uma organização bem feita e uma forma facilitada de analizar o código

# Git:

- O que é?
  - uma aplicação de controle de versão que analisa seu código e mostra a diferença entre uma versão antiga e uma mais nova, como uma linha do tempo que te permite voltar nela caso necessário.
  - Essas mudanças são guardadas na pasta ".git" e atualizadas com um commit, que adiciona um novo ponto na linha do tempo do seu código.
  - O github é uma plataforma online que permite que você analize e hospede seus repositórios e edite ou clone eles.
  - O git possui comandos de console, encontrados em Imagens\Imagem_2.png e Imagens\Imagem_3.png deste repositório, contúdo a aplicação github desktop permite que utilizemos estes comandos de forma visual, sem que tenhamos que memorizar os mesmos.
  - Branches são como _universos paralelos_ do código sendo escrito, que podem ser unificados via git merge, fazendo com que o universo principal absorva o paralelo.
