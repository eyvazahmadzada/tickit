/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next"
import { useRef, useState } from "react"
import styled, { useTheme } from "styled-components"
import { COLORS } from "../../constants"
import useOnClickOutside from "../../hooks/useOnClickOutside"
import { Theme } from '../../models'

const DropdownStyle = styled.div`
  min-width: 180px;
  position: relative;

  > button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 12px;

    > div {
      display: flex;
      align-items: center;
    }
  }

  .menu {
    position: absolute;
    top: calc(100% + 8px);
    width: 100%;
    background-color: ${COLORS.white};
    border-radius: 10px;
    overflow: hidden;
    transition: 0.3s all ease-out;
    opacity: 0;
    z-index: -1;
    visibility: hidden;
    transform-origin: top;
    transform: scaleY(0) translateY(-60%);
  
    &.open {
      opacity: 1;
      z-index: 100;
      visibility: visible;
      height: auto;
      transform: scaleY(1) translateY(0);
    }
  
    > button {
      display: block;
      text-align: left;
      width: 100%;
      background-color: ${COLORS.white};
      padding: 12px 16px;
  
      &:hover,
      &.selected {
        color: ${COLORS.white};
        background-color: ${COLORS.green};
      }
    }
  }
`

type DropdownItem = {
  name: string,
  key: string
}

interface Props {
  name: string
  icon: string
  items: DropdownItem[]
  onSelectItem: (key: string) => void
}

const Dropdown: NextPage<Props> = ({ icon, name, items, onSelectItem }) => {
  const ref = useRef(null)
  const [activeItem, setActiveItem] = useState<DropdownItem>({ name, key: '' })
  const [isOpen, setisOpen] = useState(false)
  const theme = useTheme() as Theme

  // Click outside dropdown closes it
  useOnClickOutside(ref, () => setisOpen(false))

  const selectItem = (item: DropdownItem) => {
    setActiveItem(item)
    onSelectItem(item.key)
    setisOpen(false)
  }

  const svgPrefix = theme?.text === COLORS.light ? '-light' : ''

  return (
    <DropdownStyle ref={ref}>
      <button className="card" onClick={() => setisOpen(!isOpen)}>
        <div>
          <img src={`/icons/${icon}${svgPrefix}.svg`} alt={icon} />
          <span className="ml-8">{activeItem.name}</span>
        </div>

        <img src={`/icons/arrow-down${svgPrefix}.svg`} alt="arrow-down" />
      </button>

      <div className={`menu card ${isOpen ? 'open' : ''}`}>
        {items.map(item =>
          <button
            className={`animate ${item.key === activeItem.key ? 'selected' : ''}`}
            key={item.key} onClick={() => selectItem(item)}
          >
            {item.name}
          </button>
        )}
      </div>
    </DropdownStyle>
  )
}

export default Dropdown