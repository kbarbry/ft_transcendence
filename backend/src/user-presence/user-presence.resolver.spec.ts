import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceResolver } from './user-presence.resolver'
import { UserPresenceService } from './user-presence.service'
import { PrismaService } from '../prisma/prisma.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { UserPresenceCreateInput } from './dto/create-user-presence.input'

describe('UserPresenceResolver', () => {
  let userpresenceresolver: UserPresenceResolver
  const validationPipe = new ValidationPipe()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPresenceResolver, UserPresenceService, PrismaService]
    }).compile()

    userpresenceresolver =
      module.get<UserPresenceResolver>(UserPresenceResolver)
  })

  it('should be defined', () => {
    expect(userpresenceresolver).toBeDefined()
  })

  describe('Test Error', () => {
    describe('userId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - empty id', async () => {
        const data = {}

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: UserPresenceCreateInput,
          data: ''
        }
        const res = {
          message: [
            'userId must be exactly 21 characters long.',
            'Invalid nanoid characters.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid nanoid - null nanoId', async () => {
        const data = {
          userId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: UserPresenceCreateInput,
          data: ''
        }
        const res = {
          message: [
            'userId must be exactly 21 characters long.',
            'Invalid nanoid characters.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid nanoid - too short', async () => {
        const data = {
          userId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: UserPresenceCreateInput,
          data: ''
        }
        const res = {
          message: ['userId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid nanoid - too long', async () => {
        const data = {
          userId: 'drfOayPww2qqtDrePkqqqwJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: UserPresenceCreateInput,
          data: ''
        }
        const res = {
          message: ['userId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid nanoid - invalid char', async () => {
        const data = {
          userId: 'drfOayPww 2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: UserPresenceCreateInput,
          data: ''
        }
        const res = {
          message: ['Invalid nanoid characters.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })
  })
})

//check with invalid user
// check with invalid ID (lenght or ivanlid char)
// check userpresence creation
// disconnected at working
// FindOne working
// all methods working
