module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Yuying Wu`,
    author: `Yuying Wu`,
    description: `个人博客，文字、代码、照片，记录工作和生活`,
    copyright: `&copy;2014-${(new Date()).getFullYear()} 京ICP备16019960号`,
    siteUrl: `https://wuyuying.com`,
    aboutUrl: `/about`,
    social: [{
      name: 'twitter',
      url: 'https://mobile.twitter.com/wuyuying1128',
    }, {
      name: 'github',
      url: 'https://github.com/YuyingWu',
    }, {
      name: 'douban',
      url: 'https://www.douban.com/people/wuyuying1128_',
    }, {
      name: 'zhihu',
      url: 'https://www.zhihu.com/people/yuying_wu'
    }],
    nav: [{
      title: 'Home',
      link: '/',
    }, {
      title: '技术',
      link: '/categories/tech/',
    }, {
      title: '食色笔记',
      link: '/categories/life/',
    }, {
      title: '读万卷书',
      link: '/categories/reading/',
    }, {
      title: '行万里路',
      link: '/categories/travel/',
    }]
  },
  plugins: [
    {
      resolve: `gatsby-theme-chaton`,
      options: {
        googleAnalytics: 'UA-74424222-4',
      },
    },
  ],
  // plugins: [
  //   {
  //     resolve: `gatsby-source-filesystem`,
  //     options: {
  //       path: `${__dirname}/content/blog`,
  //       name: `blog`,
  //     },
  //   },
  //   {
  //     resolve: `gatsby-source-filesystem`,
  //     options: {
  //       path: `${__dirname}/content/assets`,
  //       name: `assets`,
  //     },
  //   },
  //   {
  //     resolve: `gatsby-transformer-remark`,
  //     options: {
  //       plugins: [
  //         {
  //           resolve: `gatsby-remark-images`,
  //           options: {
  //             maxWidth: 590,
  //           },
  //         },
  //         {
  //           resolve: `gatsby-remark-responsive-iframe`,
  //           options: {
  //             wrapperStyle: `margin-bottom: 1.0725rem`,
  //           },
  //         },
  //         `gatsby-remark-autolink-headers`,
  //         `gatsby-remark-prismjs`,
  //         `gatsby-remark-copy-linked-files`,
  //         `gatsby-remark-smartypants`,
  //       ],
  //     },
  //   },
  //   `gatsby-transformer-sharp`,
  //   `gatsby-plugin-sharp`,
  //   {
  //     resolve: `gatsby-plugin-google-analytics`,
  //     options: {
  //       trackingId: `UA-74424222-4`,
  //     },
  //   },
  //   `gatsby-plugin-feed`,
  //   {
  //     resolve: `gatsby-plugin-manifest`,
  //     options: {
  //       name: `Yuying Wu's blog`,
  //       short_name: `Yuying Wu`,
  //       start_url: `/`,
  //       background_color: `#ffffff`,
  //       theme_color: `#663399`,
  //       display: `minimal-ui`,
  //       // icon: `content/assets/icon-w.png`,
  //       query: `
  //         {
  //           site {
  //             siteMetadata {
  //               title
  //               description
  //               siteUrl
  //               site_url: siteUrl
  //             }
  //           }
  //         }
  //       `,
  //       feeds: [
  //         {
  //           serialize: ({ query: { site, allMarkdownRemark } }) => {
  //             return allMarkdownRemark.edges.map(edge => {
  //               return Object.assign({}, edge.node.frontmatter, {
  //                 description: edge.node.excerpt,
  //                 date: edge.node.frontmatter.date,
  //                 url: site.siteMetadata.siteUrl + edge.node.fields.slug,
  //                 guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
  //                 custom_elements: [{ "content:encoded": edge.node.html }],
  //               })
  //             })
  //           },
  //           query: `
  //             {
  //               allMarkdownRemark(
  //                 limit: 1000,
  //                 sort: { order: DESC, fields: [frontmatter___date] },
  //                 filter: {frontmatter: { draft: { ne: true } }}
  //               ) {
  //                 edges {
  //                   node {
  //                     excerpt
  //                     html
  //                     fields { slug }
  //                     frontmatter {
  //                       title
  //                       date
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           `,
  //           output: "/rss.xml",
  //           title: "Yuying Wu's Blog RSS Feed",
  //         },
  //       ],
  //       icons: [
  //         {
  //           src: '/android-icon-36x36.png',
  //           sizes: '36x36',
  //           type: 'image/png',
  //           density: '0.75',
  //         },
  //         {
  //           src: '/android-icon-48x48.png',
  //           sizes: '48x48',
  //           type: 'image/png',
  //           density: '1.0',
  //         },
  //         {
  //           src: '/android-icon-72x72.png',
  //           sizes: '72x72',
  //           type: 'image/png',
  //           density: '1.5',
  //         },
  //         {
  //           src: '/android-icon-96x96.png',
  //           sizes: '96x96',
  //           type: 'image/png',
  //           density: '2.0',
  //         },
  //         {
  //           src: '/android-icon-144x144.png',
  //           sizes: '144x144',
  //           type: 'image/png',
  //           density: '3.0',
  //         },
  //         {
  //           src: '/android-icon-192x192.png',
  //           sizes: '192x192',
  //           type: 'image/png',
  //           density: '4.0',
  //         },
  //       ],
  //     },
  //   },
  //   // `gatsby-plugin-offline`,
  //   `gatsby-plugin-react-helmet`,
  //   {
  //     resolve: `gatsby-plugin-typography`,
  //     options: {
  //       pathToConfigModule: `src/utils/typography`,
  //     },
  //   },
  // ],
}
