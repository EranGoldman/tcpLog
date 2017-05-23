import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Log, { schema } from './model'

const router = new Router()
const { source, type, message, comment } = schema.tree

/**
 * @api {post} /logs Create log
 * @apiName CreateLog
 * @apiGroup Log
 * @apiParam source Log's source.
 * @apiParam type Log's type.
 * @apiParam message Log's message.
 * @apiParam comment Log's comment.
 * @apiSuccess {Object} log Log's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Log not found.
 */
router.post('/',
  body({ source, type, message, comment }),
  create)

/**
 * @api {get} /logs Retrieve logs
 * @apiName RetrieveLogs
 * @apiGroup Log
 * @apiUse listParams
 * @apiSuccess {Object[]} logs List of logs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /logs/:id Retrieve log
 * @apiName RetrieveLog
 * @apiGroup Log
 * @apiSuccess {Object} log Log's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Log not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /logs/:id Update log
 * @apiName UpdateLog
 * @apiGroup Log
 * @apiParam source Log's source.
 * @apiParam type Log's type.
 * @apiParam message Log's message.
 * @apiParam comment Log's comment.
 * @apiSuccess {Object} log Log's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Log not found.
 */
router.put('/:id',
  body({ source, type, message, comment }),
  update)

/**
 * @api {delete} /logs/:id Delete log
 * @apiName DeleteLog
 * @apiGroup Log
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Log not found.
 */
router.delete('/:id',
  destroy)

export default router
