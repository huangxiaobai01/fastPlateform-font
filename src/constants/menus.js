import {components} from './generalLibrary/components'
import {methods} from './generalLibrary/methods'
import {regulars} from './generalLibrary/regular'
export const menus = [
  {
    label: '快速搭建平台',
    id: 'fastPlateform',
    routeName: 'FastPlateform',
    activedCode: 'fastPlateform',
    // 页面地址
    packageAddress: 'views/fastPlateform/Index'
  },
  {
    label: '规范',
    id: 'specification',
    routeName: 'Specification',
    activedCode: 'specification',
    // 页面地址
    packageAddress: 'views/specification/Index'
  },
  {
    label: '通用库',
    id: 'generalLibrary',
    routeName: 'GeneralLibrary',
    children: [
      {
        id: 'g-components',
        label: '公共组件',
        children: components
      },
      {
        id: 'g-methods',
        label: '公共方法',
        children: methods
      },
      {
        id: 'g-regular',
        label: '公共正则',
        children: regulars
      }
    ]
  },
  {
    label: '知识库',
    id: 'knowledge',
    routeName: 'Knowledge',
    activedCode: 'knowledge',
    // 页面地址
    packageAddress: 'views/knowledge/Index'
  },
  {
    label: '项目',
    id: 'project',
    routeName: 'Project',
    type: 'select',
    children: [
      {
        label: '翎西',
        id: 'linee',
        routeName: 'Linee',
        activedCode: 'project',
        // 页面地址
        packageAddress: 'views/project/Linee'
      },
      {
        label: '药店通',
        id: 'ydt',
        routeName: 'Ydt',
        activedCode: 'project',
        // 页面地址
        packageAddress: 'views/project/Ydt'
      }
    ]
  }
]