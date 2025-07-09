/**
 * @swagger
 * components:
 *   schemas:
 *     Acessibilidade:
 *       type: object
 *       required:
 *         - nome
 *         - descricao
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         nome:
 *           type: string
 *           description: 'Nome da acessibilidade (ex: "Rampa de acesso")'
 *         descricao:
 *           type: string
 *           description: Descrição da acessibilidade
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         nome: Rampa de acesso
 *         descricao: Rampa para cadeirantes com inclinação adequada
 *
 *     Avaliacao:
 *       type: object
 *       required:
 *         - nota
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         nota:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         comentario:
 *           type: string
 *           description: Comentário opcional da avaliação
 *       example:
 *         id: "987e6543-b21d-12d3-a456-426614174abc"
 *         nota: 4
 *         comentario: Local bem acessível, mas faltam placas informativas.
 *
 *     Local:
 *       type: object
 *       required:
 *         - nome
 *         - cidade
 *         - tipo
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         nome:
 *           type: string
 *         cidade:
 *           type: string
 *         tipo:
 *           type: string
 *         acessibilidades:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Acessibilidade'
 *         avaliacoes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Avaliacao'
 *       example:
 *         id: "abc123"
 *         nome: Biblioteca Central
 *         cidade: Brasília
 *         tipo: Biblioteca
 *         acessibilidades:
 *           - id: "rampa123"
 *             nome: Rampa de acesso
 *             descricao: Rampa inclinada para cadeirantes
 *         avaliacoes:
 *           - id: "avaliacao1"
 *             nota: 5
 *             comentario: Totalmente acessível!
 *
 *     NovoLocal:
 *       type: object
 *       required:
 *         - nome
 *         - cidade
 *         - tipo
 *       properties:
 *         nome:
 *           type: string
 *         cidade:
 *           type: string
 *         tipo:
 *           type: string
 *       example:
 *         nome: Museu Nacional
 *         cidade: Brasília
 *         tipo: Museu
 *
 *     LocalCriado:
 *       allOf:
 *         - $ref: '#/components/schemas/Local'
 *
 *     Erro:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *       example:
 *         mensagem: Requisição inválida
 *
 *     ErroDetalhado:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *         detalhes:
 *           type: string
 *       example:
 *         mensagem: Erro ao processar a solicitação
 *         detalhes: Campo 'nome' é obrigatório
 *
 *     NovaAcessibilidade:
 *       type: object
 *       required:
 *         - nome
 *         - descricao
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome da acessibilidade
 *         descricao:
 *           type: string
 *           description: Descrição da acessibilidade
 *       example:
 *         nome: Rampa de acesso
 *         descricao: Rampa para cadeirantes com inclinação adequada
 *
 *     AcessibilidadeCriada:
 *       allOf:
 *         - $ref: '#/components/schemas/Acessibilidade'
 */
