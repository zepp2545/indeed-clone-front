import React, { useEffect, Fragment } from 'react'
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@material-ui/core'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core';

// components
import { Input } from './Inputs/Input'
import { BaseButton } from './Buttons/BaseButton'

// styles
import '../styles/dialog.css'

// constants
import { COLORS } from '../constants/styleConstants'

// images
import done from '../images/done.png'

const InputItem = styled.div`
  margin-bottom: 12px;
  p {
    margin: 0px;
  }
`
const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  width: 100%;
  min-height: 350px;
  box-sizing: border-box;
`

const DoneImage = styled.img`
  width: 100%;
`

const CircleLoading = styled(CircularProgress)`
  margin: 0 auto;
`

const DoneWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  text-align: center;
  padding: 40px;
  font-size: 25px;
  font-weight: 600;
`

const SubmitButton = styled(BaseButton)`
  height: 20px;
  line-height: 20px;
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  background-color: #085ff7;
  font-size: 18px;

  :hover {
    background-color: ${COLORS.MAIN};
  } 
`

export const ApplicationModal = (props) => {
  useEffect(() => {
    props.setJobId({ type: 'modalShowing', jobId: props.job.id })
  }, [])

  return (
    <Dialog open={props.isOpen} onClose={props.onClose} >
      <DialogTitle>
        <h3>{props.job.title}</h3>
        <p>{`${props.job.company.name} - ${props.job.prefecture.name} ${props.job.location_detail}`}</p>
      </DialogTitle>
      <Fragment >
        {
          props.applicationState.postState === 'initial' &&
            <Fragment>
              <DialogContent>
                <InputItem>
                  <p>氏名</p>
                  <Input 
                    type="text" 
                    name="name"
                    value={props.applicationState.name}
                    onChange={props.handleApplicationInput}
                  />
                </InputItem>
                <InputItem>
                  <p>メール</p>
                  <Input 
                    type="text" 
                    name="email"
                    value={props.applicationState.email}
                    onChange={props.handleApplicationInput}
                  />
                </InputItem>
                <InputItem>
                  <p>電話番号</p>
                  <Input 
                    type="text" 
                    name="tel"
                    onChange={props.handleApplicationInput}
                    value={props.applicationState.tel}
                  />
                </InputItem>
              </DialogContent>
              <DialogActions style={{ paddingBottom: '20px'}}>
                <SubmitButton onClick={props.handleApplicationSubmit}>
                  この求人に応募する
                </SubmitButton>
              </DialogActions>
            </Fragment>
        }
        {
          props.applicationState.postState === 'posting' &&
            <CircleWrapper>
              <CircleLoading />
            </CircleWrapper>
        }
        {
          props.applicationState.postState === 'postDone' &&
          <DialogContent>
            <DoneWrapper>
              応募が完了しました。
              <DoneImage src={done} alt="done" />
            </DoneWrapper>
          </DialogContent>
        }
        {
          props.applicationState.postState === 'notAcceptable' &&
          <DialogContent>
            <DoneWrapper>
              こちらの求人にはすでに応募済です。
              <DoneImage src={done} alt="done" />
            </DoneWrapper>
          </DialogContent>
        }
      </Fragment>     
    </Dialog>
  )
}