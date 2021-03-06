import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Log } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Log.create(body)
    .then((log) => log.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Log.find(query, select, cursor)
    .then((logs) => logs.map((log) => log.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Log.findById(params.id)
    .then(notFound(res))
    .then((log) => log ? log.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Log.findById(params.id)
    .then(notFound(res))
    .then((log) => log ? _.merge(log, body).save() : null)
    .then((log) => log ? log.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Log.findById(params.id)
    .then(notFound(res))
    .then((log) => log ? log.remove() : null)
    .then(success(res, 204))
    .catch(next)
