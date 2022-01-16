import { Task } from '../../models'
import fetch from '../interceptor'

const tasksService: { [index: string]: (...args: any[]) => Promise<any> } = {}

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

tasksService.read = async (searchKeyword: string): Promise<any> => {
  return fetch({
    url: '/tasks' + (searchKeyword ? `?q=${searchKeyword}` : ''),
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
