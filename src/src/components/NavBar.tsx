import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;

  z-index: 9999;

  color: #fff;

  padding: 1em;

  a {
    color: #fff;
  }

  ul {
    list-style: none;
    display: flex;

    li {
      flex: 0 0 auto;
      margin: 0 0.5em 0 0;
    }
  }
`

const NavBar = () => {
  return (
    <Wrapper>
      <ul>
        <li>
          <Link to="/">Projects</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </Wrapper>
  )
}

export default NavBar
