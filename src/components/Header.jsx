import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// images
import logo from '../images/logo.png'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 15px;
  border-bottom: 1px solid #dfdfdf;
`
const LogoImage = styled.img`
  height: 40px;
`

export const Header = () => {
  return (
    <HeaderWrapper>
      <Link to="/">
        <LogoImage src={logo} alt="logo" />
      </Link>
    </HeaderWrapper>
  )
}