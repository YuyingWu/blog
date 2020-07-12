exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@antv/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
  if (stage === 'build-javascript') {
    // Turn off source maps
    actions.setWebpackConfig({
      devtool: false,
    })
  }
}