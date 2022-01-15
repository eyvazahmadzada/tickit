/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next"
import { useState } from "react"
import styled from "styled-components"
import { COLORS } from "../../constants"

const AddInputStyle = styled.div`
  width: 100%;
  position: relative;

  > input {
    border-radius: 10px;
    height: 48px;
    width: 100%;
    padding-left: 24px;
    padding-right: 52px;
    width: 100%;
    font-weight: 500;
    filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.25));

    &:placeholder {
      color: rgba(0, 32, 63, 0.4);
    }
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background-color: ${COLORS.green};
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
`

const AddInput: NextPage = () => {
  const [value, setValue] = useState('')

  return (
    <AddInputStyle>
      <input type="text" placeholder="Add task" onChange={e => setValue(e.target.value)} value={value} />
      <button>
        <img src="/icons/plus.svg" alt="plus" />
      </button>
    </AddInputStyle>
  )
}

export default AddInput