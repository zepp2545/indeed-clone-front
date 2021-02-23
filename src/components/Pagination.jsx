import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// styles
import '../styles/pagination.css'

const PageLink = styled(Link)`
  background-color: #e4e2e0;
  border-radius: 5px;
  padding: 8px;
  text-decoration: none;
  width: 20px;
  height: 25px;
  line-height: 25px;
  color: black;

  :hover {
    background-color: #bfbfbf;
  }
`

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  margin: 30px 0;
`

const parsedUrl = (keyword, location, page) => {
  return (`/jobs?keyword=${keyword}&location=${location}&page=${page}`)
}

export const Pagination = (props) => {
  const pages = props.jobsCount / 10 + 1
  const links = []

  for (let i = 1; i <= pages; i++) {
    if (i > 7) {
      break
    }
    links.push(
      <PageLink id={i} key={i} to={parsedUrl(props.jobsSearchState.keyword, props.jobsSearchState.location, i)} >
        {i}
      </PageLink>
    )
  }
  
  const addCurrentClass = (currentPage) => {
    currentPage = !currentPage ? 1 : currentPage
    let el = document.getElementById(currentPage)
    el.classList.add("current")
  }

  useEffect(() => {
    addCurrentClass(props.currentPage)
  })

  return (
    <LinkWrapper>
      {links}
    </LinkWrapper>
  )
}