import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: { title: '八匹马', icon: 'dashboard', affix: true }
        }]
    },
    // {
    //     path: '/documentation',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/documentation/index'),
    //         name: 'Documentation',
    //         meta: { title: 'Documentation', icon: 'documentation', affix: true }
    //     }]
    // },
    // {
    //     path: '/guide',
    //     component: Layout,
    //     redirect: '/guide/index',
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/guide/index'),
    //         name: 'Guide',
    //         meta: { title: 'Guide', icon: 'guide', noCache: true }
    //     }]
    // },
    {
        path: '/profile',
        component: Layout,
        redirect: '/profile/index',
        hidden: true,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/profile/index'),
            name: 'Profile',
            meta: { title: 'Profile', icon: 'user', noCache: true }
        }]
    }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    // {
    //     path: '/permission',
    //     component: Layout,
    //     redirect: '/permission/page',
    //     alwaysShow: true, // will always show the root menu
    //     name: 'Permission',
    //     meta: {
    //         title: 'Permission',
    //         icon: 'lock',
    //         roles: ['admin', 'editor'] // you can set roles in root nav
    //     },
    //     children: [{
    //             path: 'page',
    //             component: () =>
    //                 import ('@/views/permission/page'),
    //             name: 'PagePermission',
    //             meta: {
    //                 title: 'Page Permission',
    //                 roles: ['admin'] // or you can only set roles in sub nav
    //             }
    //         },
    //         {
    //             path: 'directive',
    //             component: () =>
    //                 import ('@/views/permission/directive'),
    //             name: 'DirectivePermission',
    //             meta: {
    //                 title: 'Directive Permission'
    //                     // if do not set roles, means: this page does not require permission
    //             }
    //         },
    //         {
    //             path: 'role',
    //             component: () =>
    //                 import ('@/views/permission/role'),
    //             name: 'RolePermission',
    //             meta: {
    //                 title: 'Role Permission',
    //                 roles: ['admin']
    //             }
    //         }
    //     ]
    // },

    // {
    //     path: '/icon',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/icons/index'),
    //         name: 'Icons',
    //         meta: { title: 'Icons', icon: 'icon', noCache: true }
    //     }]
    // },

    //老师页面
    {
        path: '/class',
        component: Layout,
        redirect: '/class/page',
        name: 'class',
        meta: {
            roles: ['editor'],
            title: '我的班级',
            icon: 'component'
        },
        children: [{
            path: 'informationClass',
            component: () =>
                import ('@/views/table/complex-table'),
            name: 'informationClass',
            meta: {
                roles: ['editor'],

                title: '信管班',
                roles: ['editor'] // or you can only set roles in sub nav
            }
        }, {
            path: 'financeClass',
            component: () =>
                import ('@/views/table/complex-table'),
            name: 'financeClass',
            meta: {
                roles: ['editor'],

                title: '金融班',
                // roles: ['admin'] // or you can only set roles in sub nav
            }
        }]
    },
    {
        path: '/questionnaire',
        component: Layout,
        redirect: '/questionnaire/page',
        name: 'questionnaire',
        meta: {
            roles: ['editor'],

            title: '我的问卷',
            icon: 'component'
        },
        children: [{
            path: 'madeQuestionnaire',
            component: () =>
                import ('@/views/components-demo/tinymce'),
            name: 'madeQuestionnaire',
            meta: {
                title: '制作问卷',
                // roles: ['admin'] // or you can only set roles in sub nav
            }
        }, {
            path: 'publishedQuestionnaire',
            component: () =>
                import ('@/views/table/inline-edit-table'),

            name: 'publishedQuestionnaire',
            meta: {
                title: '已发布问卷',
                // roles: ['admin'] // or you can only set roles in sub nav
            }
        }, {
            path: 'feedbackDate',
            component: () =>
                import ('@/views/charts/mix-chart'),
            name: 'feedbackDate',
            meta: {
                title: '反馈数据',
                // roles: ['admin'] // or you can only set roles in sub nav
            }
        }]
    },
    {
        path: '/messageBoard',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/tab/index'),
            name: 'messageBoard',
            meta: {
                roles: ['editor'],

                title: '我的留言板',
                icon: 'tab'
            }
        }]
    },
    {
        path: '/forum',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/example/list'),
            name: 'forum',
            meta: {
                roles: ['editor'],

                title: '心得论坛',
                icon: 'list'
            }
        }]
    },
    {
        path: '/personalSet',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/profile/index'),
            name: 'personalSet',
            meta: {
                roles: ['editor', 'student'],
                title: '个人设置',
                icon: 'user'
            }
        }]
    },

    //学生设置
    {
        path: '/teachers',
        component: Layout,
        redirect: '/teachers/page',
        name: 'teachers',
        meta: {
            roles: ['student'],
            title: '我的老师',
            icon: 'component'
        },
        children: [{
            path: 'Tmathematics',
            component: () =>
                import ('@/views/tab/index'),
            name: 'Tmathematics',
            meta: {
                title: '王数学',
                // roles: ['admin'] // or you can only set roles in sub nav
            }
        }, {
            path: 'Tchinese',
            component: () =>
                import ('@/views/tab/index'),
            name: 'Tchinese',
            meta: {
                title: '李语文',
                // roles: ['admin'] // or you can only set roles in sub nav
            }
        }]
    },
    //我的消息
    {
        path: '/infor',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/components-demo/drag-kanban'),
            name: 'infor',
            meta: {
                roles: ['student'],
                title: '我的消息',
                icon: 'list'
            }
        }]
    },
    //个人设置与老师共享
    //超级管理员
    //班级管理包括学生管理
    {
        path: '/class',
        component: Layout,
        redirect: '/class/page',
        name: 'class',
        meta: {
            roles: ['admin'],

            title: '班级管理',
            icon: 'component'
        },
        children: [{
            path: 'informationClass',
            component: () =>
                import ('@/views/table/complex-table'),
            name: 'informationClass',
            meta: {
                title: '信管班',
                // roles: ['admin'] // or you can only set roles in sub nav
            }
        }, {
            path: 'financeClass',
            component: () =>
                import ('@/views/table/complex-table'),
            name: 'financeClass',
            meta: {
                title: '金融班',
                // roles: ['admin'] // or you can only set roles in sub nav
            }
        }]
    },
    //老师管理与留言板管理结合
    {
        path: '/teachers',
        component: Layout,
        redirect: '/teachers/page',
        name: 'teachers',
        meta: {
            roles: ['admin'],

            title: '老师管理',
            icon: 'component'
        },
        children: [{
            path: 'Tmathematics',
            component: () =>
                import ('@/views/tab/index'),
            name: 'Tmathematics',
            meta: {
                title: '王数学',
                // roles: ['admin'] // or you can only set roles in sub nav
            }
        }, {
            path: 'Tchinese',
            component: () =>
                import ('@/views/tab/index'),
            name: 'Tchinese',
            meta: {
                title: '李语文',
                // roles: ['admin'] // or you can only set roles in sub nav
            }
        }]
    },
    //论坛管理与老师共享
    {
        path: '/forum',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/example/list'),
            name: 'forum',
            meta: {
                roles: ['admin'],

                title: '论坛管理',
                icon: 'list'
            }
        }]
    },
    //留言板管理

    /** when your routing map is too long, you can split it into small modules **/
    // componentsRouter,
    // chartsRouter,
    // nestedRouter,
    // tableRouter,

    // {
    //     path: '/example',
    //     component: Layout,
    //     redirect: '/example/list',
    //     name: 'Example',
    //     meta: {
    //         title: 'Example',
    //         icon: 'example'
    //     },
    //     children: [{
    //             path: 'create',
    //             component: () =>
    //                 import ('@/views/example/create'),
    //             name: 'CreateArticle',
    //             meta: { title: 'Create Article', icon: 'edit' }
    //         },
    //         {
    //             path: 'edit/:id(\\d+)',
    //             component: () =>
    //                 import ('@/views/example/edit'),
    //             name: 'EditArticle',
    //             meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
    //             hidden: true
    //         },
    //         {
    //             path: 'list',
    //             component: () =>
    //                 import ('@/views/example/list'),
    //             name: 'ArticleList',
    //             meta: { title: 'Article List', icon: 'list' }
    //         }
    //     ]
    // },

    // {
    //     path: '/tab',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/tab/index'),
    //         name: 'Tab',
    //         meta: { title: 'Tab', icon: 'tab' }
    //     }]
    // },

    // {
    //     path: '/error',
    //     component: Layout,
    //     redirect: 'noRedirect',
    //     name: 'ErrorPages',
    //     meta: {
    //         title: 'Error Pages',
    //         icon: '404'
    //     },
    //     children: [{
    //             path: '401',
    //             component: () =>
    //                 import ('@/views/error-page/401'),
    //             name: 'Page401',
    //             meta: { title: '401', noCache: true }
    //         },
    //         {
    //             path: '404',
    //             component: () =>
    //                 import ('@/views/error-page/404'),
    //             name: 'Page404',
    //             meta: { title: '404', noCache: true }
    //         }
    //     ]
    // },

    // {
    //     path: '/error-log',
    //     component: Layout,
    //     children: [{
    //         path: 'log',
    //         component: () =>
    //             import ('@/views/error-log/index'),
    //         name: 'ErrorLog',
    //         meta: { title: 'Error Log', icon: 'bug' }
    //     }]
    // },

    // {
    //     path: '/excel',
    //     component: Layout,
    //     redirect: '/excel/export-excel',
    //     name: 'Excel',
    //     meta: {
    //         title: 'Excel',
    //         icon: 'excel'
    //     },
    //     children: [{
    //             path: 'export-excel',
    //             component: () =>
    //                 import ('@/views/excel/export-excel'),
    //             name: 'ExportExcel',
    //             meta: { title: 'Export Excel' }
    //         },
    //         {
    //             path: 'export-selected-excel',
    //             component: () =>
    //                 import ('@/views/excel/select-excel'),
    //             name: 'SelectExcel',
    //             meta: { title: 'Export Selected' }
    //         },
    //         {
    //             path: 'export-merge-header',
    //             component: () =>
    //                 import ('@/views/excel/merge-header'),
    //             name: 'MergeHeader',
    //             meta: { title: 'Merge Header' }
    //         },
    //         {
    //             path: 'upload-excel',
    //             component: () =>
    //                 import ('@/views/excel/upload-excel'),
    //             name: 'UploadExcel',
    //             meta: { title: 'Upload Excel' }
    //         }
    //     ]
    // },

    // {
    //     path: '/zip',
    //     component: Layout,
    //     redirect: '/zip/download',
    //     alwaysShow: true,
    //     name: 'Zip',
    //     meta: { title: 'Zip', icon: 'zip' },
    //     children: [{
    //         path: 'download',
    //         component: () =>
    //             import ('@/views/zip/index'),
    //         name: 'ExportZip',
    //         meta: { title: 'Export Zip' }
    //     }]
    // },

    // {
    //     path: '/pdf',
    //     component: Layout,
    //     redirect: '/pdf/index',
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/pdf/index'),
    //         name: 'PDF',
    //         meta: { title: 'PDF', icon: 'pdf' }
    //     }]
    // },
    // {
    //     path: '/pdf/download',
    //     component: () =>
    //         import ('@/views/pdf/download'),
    //     hidden: true
    // },

    // {
    //     path: '/theme',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/theme/index'),
    //         name: 'Theme',
    //         meta: { title: 'Theme', icon: 'theme' }
    //     }]
    // },

    // {
    //     path: '/clipboard',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/clipboard/index'),
    //         name: 'ClipboardDemo',
    //         meta: { title: 'Clipboard', icon: 'clipboard' }
    //     }]
    // },

    // {
    //     path: 'external-link',
    //     component: Layout,
    //     children: [{
    //         path: 'https://github.com/PanJiaChen/vue-element-admin',
    //         meta: { title: 'External Link', icon: 'link' }
    //     }]
    // },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router