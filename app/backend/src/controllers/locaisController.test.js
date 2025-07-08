/**
 * @jest-environment node
 */

import { jest } from '@jest/globals'

jest.mock('@prisma/client', () => {
  const mLocal = {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
  }
  const mPrisma = { local: mLocal, $disconnect: jest.fn() }
  return { PrismaClient: jest.fn(() => mPrisma) }
})

import { listarLocais, criarLocal } from '../controllers/locaisController.js'
import { PrismaClient } from '@prisma/client'

describe('locaisController', () => {
  let prisma
  const makeReq = (query = {}, body = {}) => ({ query, body })
  const makeRes = () => {
    const res = {}
    res.status = jest.fn(() => res)
    res.json = jest.fn(() => res)
    return res
  }

  beforeAll(() => {
    prisma = new PrismaClient()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('listarLocais', () => {
    it('deve filtrar por nome quando passado nome no query', async () => {
      const fakeLocal = { id: '1', nome: 'Parque Teste', cidade: 'Cidade X' }
      prisma.local.findMany.mockResolvedValue([fakeLocal])

      const req = makeReq({ nome: 'Parque' })
      const res = makeRes()

      await listarLocais(req, res)

      expect(prisma.local.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { nome: { contains: 'Parque', mode: 'insensitive' } },
          take: expect.any(Number),
        })
      )
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: [fakeLocal] })
      )
    })

    it('deve filtrar por proximidade quando latitude, longitude e raio são fornecidos', async () => {
      const item = { id: '2', nome: 'Local Perto', latitude: '-23.55', longitude: '-46.63' }
      prisma.local.findMany.mockResolvedValue([item])

      const req = makeReq({ latitude: '-23.55', longitude: '-46.63', raio: '1000' })
      const res = makeRes()

      await listarLocais(req, res)

      // verifica que findMany foi chamado com include e take
      expect(prisma.local.findMany).toHaveBeenCalled()
      // status 200 e json com distância
      expect(res.status).toHaveBeenCalledWith(200)
      const jsonArg = res.json.mock.calls[0][0]
      expect(jsonArg).toMatchObject({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({ id: '2', distancia: expect.any(Number) })
        ])
      })
    })
  })

  describe('criarLocal', () => {
    it('deve retornar 400 se faltar campo obrigatório', async () => {
      const req = makeReq({}, { nome: 'Sem Lat/Long' })
      const res = makeRes()
      await criarLocal(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: false, campos_obrigatorios: expect.any(Array) })
      )
    })

    it('deve criar novo local com dados válidos (status 201)', async () => {
      const input = {
        nome: 'Novo Local',
        descricao: 'Desc',
        tipo: 'Tipo',
        endereco: 'Rua X',
        cidade: 'Y',
        bairro: 'Z',
        estado: 'E',
        latitude: -23.5,
        longitude: -46.6,
        criado_por: 'user-1'
      }
      const fakeCreated = { ...input, id: 'uuid-123', status: 'aprovado' }
      prisma.local.create.mockResolvedValue(fakeCreated)

      const req = makeReq({}, input)
      const res = makeRes()

      await criarLocal(req, res)

      expect(prisma.local.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({
          nome: 'Novo Local',
          cidade: 'Y',
          status: 'aprovado',
          criado_por: 'user-1',
        })})
      )
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: fakeCreated })
      )
    })
  })
})
