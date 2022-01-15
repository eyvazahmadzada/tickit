/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next"
import { useState } from "react"
import styled from "styled-components"
import { COLORS } from "../../constants"

const OrderTogglerStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  min-width: 90px;
  background-color: ${COLORS.white};

  > img
    transition: 0.2s ease-out;

    .rotate {
      transform: rotate(180deg);
    }
  }
`

const OrderToggler: NextPage = () => {
  const [isAsc, setIsAsc] = useState(true)

  return (
    <OrderTogglerStyle className="card mr-8" onClick={() => setIsAsc(!isAsc)}>
      <img className={`animate ${!isAsc ? 'rotate' : ''}`} src="/icons/asc.svg" alt="asc" />
      <span className="ml-4">{isAsc ? 'ASC' : 'DESC'}</span>
    </OrderTogglerStyle>
  )
}

export default OrderToggler