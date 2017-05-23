import { Log } from '.'

let log

beforeEach(async () => {
  log = await Log.create({ source: 'test', type: 'test', message: 'test', comment: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = log.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(log.id)
    expect(view.source).toBe(log.source)
    expect(view.type).toBe(log.type)
    expect(view.message).toBe(log.message)
    expect(view.comment).toBe(log.comment)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = log.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(log.id)
    expect(view.source).toBe(log.source)
    expect(view.type).toBe(log.type)
    expect(view.message).toBe(log.message)
    expect(view.comment).toBe(log.comment)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
