import React from 'react'
import { Link } from 'react-router-dom'
import { css, cx } from '@emotion/css'

const styles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;

  color: var(--text);

  padding: 1em;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    list-style: none;
    display: flex;

    li {
      flex: 0 0 auto;
      margin: 0 0.5em 0 0;
    }
  }

  a {
    display: inline-block;
    position: relative;
    color: inherit;
    text-decoration: none;
    transition: all ease 0.3s;

    opacity: 0.7;

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      content: '←';
      opacity: 0;
      transition: all ease 0.3s;
    }

    &:hover,
    &:focus {
      opacity: 1;
      transform: translate(1.2em, 0px);

      &:before {
        transform: translate(-1.2em, 0px);
        opacity: 1;
      }
    }
  }
`

const Nav = () => {
  return (
    <nav className={cx(styles)}>
      <ul>
        <li>
          <a
            href="https://parsons.nyc"
            rel={'noopener'}
            referrerPolicy={'no-referrer'}
          >
            parsons.nyc
          </a>
        </li>
      </ul>
      <ul>
        <li>Fall 2021</li>
      </ul>
    </nav>
  )
}

export default Nav
