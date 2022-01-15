/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next"
import { useEffect, useState } from "react"
import styled from "styled-components"

const SearchBarStyle = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  > img {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  > input {
    width: 100%;
    padding-left: 52px;
    padding-right: 52px;
    height: 100%;
    font-weight: 500;

    &:placeholder {
      color: rgba(0, 32, 63, 0.4);
    }
  }

  > button {
    display: none;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    &.show {
      display: inline-flex;
    }
  }
`

interface Props {
  onValueChange: (value: string) => void
}

const SearchBar: NextPage<Props> = ({ onValueChange }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onValueChange(value)
    }, 500)

    return () => clearTimeout(timer)
  }, [value, onValueChange])

  return (
    <SearchBarStyle className="card">
      <img src="/icons/search.svg" alt="search" />
      <input type="text" placeholder="Search tasks..." onChange={(e) => setValue(e.target.value)} value={value} />
      <button onClick={() => setValue('')} className={value !== '' ? 'show' : ''}>
        <img src="/icons/close.svg" alt="close" />
      </button>
    </SearchBarStyle>
  )
}

export default SearchBar