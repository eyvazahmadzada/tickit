/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { COLORS } from "../../constants"

const ToastStyle = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 48px;
  right: -100%;
  width: 300px;
  min-height: 100px;
  color: ${COLORS.white} !important;
  padding: 16px;
  transition: all .3s ease-in-out;
  z-index: 100;

  &.show {
    right: 24px;
  }

  &.success {
    background-color: ${COLORS.green};
  }

  &.error {
    background-color: ${COLORS.red};
  }

  > div {
    > h4 {
      margin: 0 0 8px 0;
    }
  }
`

interface Props {
  message: string | null
  type: 'success' | 'error'
}

const Toast: NextPage<Props> = ({ message, type }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (message) {
      setShow(true)
      setTimeout(() => setShow(false), 1500)
    }
  }, [message])

  return (
    <ToastStyle className={`card ${type} ${show ? 'show' : ''}`} >
      <img src={`/icons/toast-${type}.svg`} alt="status" />
      <div className="ml-16">
        <h4>{type.toUpperCase()}</h4>
        <span>{message}</span>
      </div>
    </ToastStyle>
  )
}

export default Toast