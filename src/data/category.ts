import internal from 'stream'

export interface ILink {
  name: string
  src: string
  id: number
}

const categoryList:ILink[] =  [
  {
    name: '新蜂超市',
    src: 'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
    id: 100001,
  },
  {
    name: '新蜂服饰',
    src: 'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
    id: 100003,
  },
  {
    name: '全球购',
    src: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
    id: 100002,
  },
  {
    name: '新蜂生鲜',
    src: 'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
    id: 100004,
  },
  {
    name: '新蜂到家',
    src: 'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
    id: 100005,
  },
  {
    name: '充值缴费',
    src: 'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
    id: 100006,
  },
  {
    name: '9.9元拼',
    src: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
    id: 100007,
  },
  {
    name: '领劵',
    src: 'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
    id: 100008,
  },
  {
    name: '省钱',
    src: 'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
    id: 100009,
  },
  {
    name: '全部',
    src: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
    id: 100010,
  },
]


export default categoryList
