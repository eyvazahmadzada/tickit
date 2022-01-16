/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next"
import { useState } from "react"
import styled from "styled-components"
import { COLORS } from "../../constants"

const AddInputStyle = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  > input {
    width: 100%;
    padding-left: 24px;
    padding-right: 52px;
    height: 100%;
    width: 100%;
    font-weight: 500;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};

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

    &:disabled {
      opacity: 0.7;
      cursor: default;
    }
  }
`

interface Props {
  onAddTask: (content: string) => void
}

const AddInput: NextPage<Props> = ({ onAddTask }) => {
  const [value, setValue] = useState('')

  const addTask = () => {
    if (value) {
      onAddTask(value)
      setValue('')
    }
  }

  return (
    <AddInputStyle className="card">
      <input type="text" placeholder="Add task" onChange={e => setValue(e.target.value)} value={value} />
      <button onClick={addTask} disabled={!value}>
        <img src="/icons/plus.svg" alt="plus" />
      </button>
    </AddInputStyle>
  )
}

export default AddInput