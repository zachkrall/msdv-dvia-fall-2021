import React from 'react'
import { css, cx } from '@emotion/css'
import Markdown from 'markdown-to-jsx'
import makeBlock from '../../../../cms/notion/block'

const ProjectContent = ({ content }) => {
  const styles = css`
    padding: 2em;

    --base-pad: 0.5rem;

    h1 {
      font-size: 1.8em;
    }

    h2 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 1.3em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: var(--base-pad) 0;
      font-weight: 700;
    }

    p {
      padding: var(--base-pad) 0;
      line-height: 1.5;
    }

    & > div > p {
      font-family: Redaction;
      letter-spacing: 0.01em;
      font-size: 1.1em;
    }

    ul,
    ol {
      padding: var(--base-pad) 0;
      list-style-position: inside;
    }

    li {
      padding: 0;
      margin: 0;
      line-height: 1;

      :not(:last-child) {
        padding-bottom: var(--base-pad);
      }

      p {
        margin: 0;
        padding: 0;
      }
    }

    img {
      max-width: 100%;
    }

    code {
      margin: var(--base-pad) 0;
      padding: 1em;
      overflow: auto;
      line-height: 1.5;
      display: block;
      background: #eee;
      border: 1px solid #ddd;
      border-radius: 10px;
    }

    hr {
      margin: var(--base-pad) 0;
      background: #000;
      border: 0;
      height: 1px;
      display: block;
    }

    blockquote {
      margin: var(--base-pad) 0;
      padding: 1em;
      border-left: 2px solid #ddd;
    }

    a {
      color: #000;
      text-decoration: none;
      background: linear-gradient(to left, #ddd 0%, #ddd 100%);
      background-repeat: no-repeat;
      background-size: 100% 2px;
      background-position: 0px 100%;

      transition: all ease 0.6s;
    }

    div.error-block {
      background: #eee;
      margin: var(--base-pad) 0;
      padding: 0.5rem;
      font-size: 0.8em;
      text-align: center;
      border-radius: 10px;
      font-weight: 600;
      color: #333;
    }

    div.file,
    div.bookmark {
      margin: var(--base-pad) 0;

      a {
        padding: 1em;
        border-radius: 10px;
        display: inline-flex;
        align-items: center;
        background: #fff;
        border: 1px solid #bbb;
        box-shadow: 0px 3px 0px #ccc;
        svg {
          margin-right: 0.5em;
        }
      }
      a:hover {
        background: #ccf;
        border: 1px solid #aaf;
        box-shadow: 0px 3px 0px #ccf;
        color: #00f;
      }
    }
  `
  return (
    <div className={cx(styles)}>
      <Markdown>
        {content
          .map((block) => {
            return makeBlock({ ...block })
          })
          .join('\n')}
      </Markdown>
    </div>
  )
}

export default ProjectContent
