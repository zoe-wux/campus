import Mock from 'mockjs'
import { deepClone } from '../../src/utils/index.js'
import { asyncRoutes, constantRoutes } from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [{
        key: 'admin',
        name: '超级管理员',
        description: '超级管理员的管理页面',
        // routes: routes,
        routes: routes.filter(i => i.path !== '/permission')
    },
    {
        key: 'editor',
        name: 'editor',
        description: '看老师的页面',
        routes: routes.filter(i => i.path !== '/permission') // just a mock
    },
    {
        key: 'student',
        name: 'student',
        description: '看学生的页面',
        routes: routes.filter(i => i.path !== '/permission') // just a mock
    },
    {
        key: 'visitor',
        name: 'visitor',
        description: 'Just a visitor. Can only see the home page and the document page',
        routes: routes.filter(i => i.path !== '/permission')
            // routes: [{
            //     path: '',
            //     redirect: 'dashboard',
            //     children: [{
            //         path: 'dashboard',
            //         name: 'Dashboard',
            //         meta: { title: 'dashboard', icon: 'dashboard' }
            //     }]
            // }]
    }
]

export default [
    // mock get all routes form server
    {
        url: '/routes',
        type: 'get',
        response: _ => {
            return {
                code: 20000,
                data: routes
            }
        }
    },

    // mock get all roles form server
    {
        url: '/roles',
        type: 'get',
        response: _ => {
            return {
                code: 20000,
                data: roles
            }
        }
    },

    // add role
    {
        url: '/role',
        type: 'post',
        response: {
            code: 20000,
            data: {
                key: Mock.mock('@integer(300, 5000)')
            }
        }
    },

    // update role
    {
        url: '/role/[A-Za-z0-9]',
        type: 'put',
        response: {
            code: 20000,
            data: {
                status: 'success'
            }
        }
    },

    // delete role
    {
        url: '/role/[A-Za-z0-9]',
        type: 'delete',
        response: {
            code: 20000,
            data: {
                status: 'success'
            }
        }
    }
]