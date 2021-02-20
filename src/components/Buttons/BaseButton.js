import styled from 'styled-components'

import { COLORS } from '../../constants/styleConstants'

export const BaseButton = styled.div`
  background-color: ${COLORS.MAIN};
  cursor: pointer;
  color: #fff;
  text-align: center;
  border-radius: 7px;
  :hover {
    background-color: ${COLORS.SUB};
  }
`