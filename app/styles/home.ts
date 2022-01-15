import styled from 'styled-components'
import { BREAKPOINTS } from '../constants/index'
import { COLORS } from './../constants/index'

// Utility
export const GreenText = styled.span`
  color: ${COLORS.green};
`
export const OrangeText = styled.span`
  color: ${COLORS.orange};
`
export const BigText = styled.div`
  font-size: 48px;
`
export const GreenUppercaseText = styled(GreenText)`
  text-transform: uppercase;
`
export const HideOnMobile = styled.span`
  display: none;

  @media (min-width: ${BREAKPOINTS.lg}) {
    display: block;
  }
`

// Component
export const Wrapper = styled.div`
  padding: 24px 16px;

  @media (min-width: ${BREAKPOINTS.lg}) {
    padding: 48px 120px;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 32px;
  line-height: 48px;
`

export const Headline = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-weight: 700;
`

export const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${BREAKPOINTS.lg}) {
    flex-wrap: wrap;
  }
`

export const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;

  @media (max-width: ${BREAKPOINTS.lg}) {
    margin-left: 0;
    margin-top: 24px;
    width: 100%;

    > button,
    > div {
      width: 50%;
      min-width: auto;
    }
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    > button,
    > div {
      width: 100%;
    }
  }
`
