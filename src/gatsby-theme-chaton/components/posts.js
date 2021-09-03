import React, { Fragment } from "react";
import { Link } from "gatsby";
import { Styled, css } from "theme-ui";
import Layout from "gatsby-theme-chaton/src/components/layout";
import SEO from "gatsby-theme-chaton/src/components/seo";
import Footer from "gatsby-theme-chaton/src/components/home-footer";

const Posts = ({ location, posts, siteTitle }) => {
  return (
    <Layout location={location} title={siteTitle}>
      <main>
        {posts.map(({ node }) => {
          const title = node.title || node.slug;
          const keywords = node.keywords || [];
          const tags = node.tags || [];
          const isTagedCocktail = tags.includes('cocktail');
          const path = node.slug.replace(/\//g, '');

          return (
            <Fragment key={node.slug}>
              <SEO title="Home" keywords={keywords} />
              <div>
                <Styled.h2
                  css={css({
                    mb: 1
                  })}
                >
                  <Styled.a
                    as={Link}
                    css={{
                      textDecoration: `none`
                    }}
                    to={isTagedCocktail ? `cocktail?id=${path}` : `/${path}`}
                  >
                    {title}
                  </Styled.a>

                  {tags.map(tag => (
                    <Styled.inlineCode
                      key={`tag-${tag}`}
                      as={Link}
                      to={`/tags/${tag}`}
                      css={{
                        fontSize: 1,
                        marginLeft: 3,
                        marginRight: 2,
                        textDecoration: "none",
                        fontWeight: 400
                      }}
                    >
                      {tag}
                    </Styled.inlineCode>
                  ))}
                </Styled.h2>
                <small>{node.date}</small>
                <Styled.p>{node.excerpt}</Styled.p>
              </div>
            </Fragment>
          );
        })}
      </main>
      <Footer />
    </Layout>
  );
};

export default Posts;