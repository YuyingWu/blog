module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Yuying Wu`,
    author: `Yuying Wu`,
    description: `个人博客，文字、代码、照片，记录工作和生活`,
    copyright: `&copy;2014-${new Date().getFullYear()} 京ICP备16019960号`,
    siteUrl: `https://wuyuying.com`,
    aboutUrl: `/about`,
    avatar: 'https://wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/avatar.jpeg',
    social: [
      {
        name: 'RSS',
        url: 'https://wuyuying.com/rss.xml',
      },
      {
        name: 'Github',
        url: 'https://github.com/YuyingWu',
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
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    `gatsby-plugin-offline`,
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
