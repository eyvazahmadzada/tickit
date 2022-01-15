import { NextPage } from "next"
import styled from "styled-components"
import { COLORS } from "../../constants"

const SwitcherStyle = styled.div`
  width: 64px;
  height: 30px;

  > input {
    opacity: 0;
    position: absolute;

    &:checked {
      & + label:before {
        transition: width 0.2s cubic-bezier(0, 0, 0, 0.1);
      }

      & + label:after {
        left: calc(64px - 27px);
      }
    }

    & + label {
      position: relative;
      display: block;
      box-sizing: content-box;
      user-select: none;
      transition: 0.4s ease;
      width: 64px;
      height: 30px;
      border-radius: 100px;
      border: 1px solid ${COLORS.dark};

      &:before {
        content: "";
        position: absolute;
        display: block;
        cursor: pointer;
        transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
        width: 64px;
        height: 30px;
        top: 0;
        left: 0;
        border-radius: 100px;
        background-color: ${COLORS.light};
      }

      &:after {
        content: "";
        position: absolute;
        display: block;
        cursor: pointer;
        transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
        height: 24px;
        width: 24px;
        top: 3px;
        left: 3px;
        border-radius: 50%;
        background-color: ${COLORS.dark};
      }
    }
  }
`

interface Props {
  name: string
  onToggle: () => void
  isChecked: boolean
}

const Switcher: NextPage<Props> = ({ name, onToggle, isChecked }) => {
  return (
    <SwitcherStyle>
      <input type="checkbox" name={name} id={name} onChange={onToggle} checked={isChecked} />
      <label htmlFor={name}></label>
    </SwitcherStyle>
  )
}

export default Switcher