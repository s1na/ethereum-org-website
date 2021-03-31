import React, { useState } from "react"
import styled from "styled-components"
import { ButtonSecondary } from "./SharedStyledComponents"
import Help from "../components/Help"
import { trackCustomEvent } from "../utils/matomo"

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 2rem;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Title = styled.h3`
  margin-top: 0rem;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 0.5rem;
`

const StyledHelp = styled(Help)`
  margin-top: 1.5rem;
`

const Question = styled.div`
  margin-right: 1rem;
`

const ButtonContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 1rem;
  }
`

const FeedbackCard = () => {
  const [isHelpful, setIsHelpful] = useState()

  const title = isHelpful
    ? "Thanks for your feedback!"
    : "Did this page help answer your question?"

  const handleClick = (isHelpful) => {
    trackCustomEvent({
      eventCategory: `Page is helpful feedback`,
      eventAction: `Clicked`,
      eventName: isHelpful,
    })
    setIsHelpful(isHelpful)
  }
  return (
    <Card>
      <Content>
        <Question>
          <Title>{title}</Title>
        </Question>
        {isHelpful !== true && (
          <ButtonContainer>
            <ButtonSecondary onClick={() => handleClick(true)}>
              Yes
            </ButtonSecondary>
            <ButtonSecondary onClick={() => handleClick(false)} ml={`0.5rem`}>
              No
            </ButtonSecondary>
          </ButtonContainer>
        )}
      </Content>
      {isHelpful === false && <StyledHelp />}
    </Card>
  )
}

export default FeedbackCard
