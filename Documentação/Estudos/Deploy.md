# Como faremos deploy

## Ferramentas

- Vercel
- Render

## Como funciona

A ideia principal é fazer uma conexão entre os deploys do front com o backend, ou seja, conectar o render e o vercel juntos.

    - notas a se importar:
    1. o Vite NÃO É uma ferramenta de deploy, mas sim de build.

### Implementção do Vercel com o React Vite

1. O código deve ser o mais recente possível.
2. Devemos loggar no próprio site do Vercel usando uma conta do projeto.
3. Devemos escolher o framework que estamos utilizando (vite).
4. Devemos editar a ROOT do nosso projeto, já que ela está localizada em /app/frontend (a localização de index.html).
5. Clicar em Build.
6. IMPORTANTE: FAZER COMMIT NA MESMA CONTA UTILIZADA PARA FAZER ESSA BUILD NO SITE DO VERCEL.
7. Prontinho, buildado e online.

### Implementação do Render para nosso servidor

1. O código deve ser o mais recente possível
2. Devemos loggar no próprio site do Render usando uma conta do projeto.
3. Devemos escolher qual o tipo de projeto vamos criar (web service, banco de dados, etc).
4. Devemos escolher a Linguagem do projeto, no caso desse, o node.
5. Devemos escolher o servidor que vamos utilizar.
6. Devemos mudar a ROOT do projeto para app/backend (creio eu, não trabalhei no backend).
7. Selecionar comando de build
8. Selecionar comando de start (como node index.js)
9. Selecionar plano free.
10. CASO HAJAM .env´s, criar essas variáveis no próprio website.
11. Dar deploy.

### Implementação de ambas

é só conectar o servidor aonde normalmente conectaríamos, a diferença é que não vai ser em um arquivo ou localhost

### Vídeos usados para o estudo

[Integração Vercel+Render](https://www.youtube.com/watch?v=vrvEsNLhlag)\
[Integração Vercel](https://www.youtube.com/watch?v=0v74FFEPcrU)\
[Integração Render](https://www.youtube.com/watch?v=e7L_8XVQBik)
