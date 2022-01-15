import Task from '../../models/Task'
import fetch from '../interceptor'

const tasksService: { [index: string]: Function } = {}

tasksService.create = async (data: Task): Promise<any> => {
  return fetch({
    url: '/tasks',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data,
  })
}

tasksService.read = async (): Promise<any> => {
  return fetch({
    url: '/tasks',
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  })
}

tasksService.update = async (id: number, data: Task): Promise<any> => {
  return fetch({
    url: `/tasks/${id}`,
    method: 'put',
    headers: {
      'public-request': 'true',
    },
    data,
  })
}

tasksService.delete = async (id: number): Promise<any> => {
  return fetch({
    url: `/tasks/${id}`,
    method: 'delete',
    headers: {
      'public-request': 'true',
    },
  })
}

export default tasksService
