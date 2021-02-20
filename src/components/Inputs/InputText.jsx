import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 7px;
  border: 1px solid #989898;
  padding: 2px 10px;
`

export const InputText = (props) => {
  return (
    <Input type="text" placeholder={props.placeholder} />
  )
}