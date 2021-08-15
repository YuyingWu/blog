module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Yuying Wu`,
    author: `Yuying Wu`,
    description: `个人博客，文字、代码、照片，记录工作和生活`,
    copyright: `&copy;2014-${new Date().getFullYear()} 京ICP备16019960号`,
    siteUrl: `https://wuyuying.com`,
    aboutUrl: `/about`,
    avatar: 'https://static.wuyuying.com/avatar.jpeg',
    social: [
      {
        name: 'rss',
        url: 'https://wuyuying.com/rss.xml',
      },
      {
        name: 'github',
        url: 'https://github.com/YuyingWu',
      },
      {
        name: 'douban',
        url: 'https://www.douban.com/people/wuyuying1128_/',
      },
      {
        name: 'zhihu',
        url: 'https://www.zhihu.com/people/yuying_wu',
      },
    ],
    nav: [
      {
        title: 'Home',
        link: '/',
      },
      {
        title: '技术',
        link: '/categories/tech/',
      },
      {
        title: '食色笔记',
        link: '/categories/life/',
      },
      {
        title: '读万卷书',
        link: '/categories/reading/',
      },
      {
        title: '行万里路',
        link: '/categories/travel/',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-theme-chaton`,
      options: {
        googleAnalytics: 'UA-74424222-4',
      },
    },
    // {
    //   resolve: "gatsby-plugin-antd",
    //   options: {
    //     style: true,
    //   },
    // },
    {
      resolve: `gatsby-plugin-material-ui`,
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
      },
    },
    {
      resolve: 'gatsby-plugin-static-folders',
      options: {
        folders: [
          './static',
        ]
      }
    }
  ],
}
