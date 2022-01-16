/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next"
import { useRef, useState } from "react"
import styled from "styled-components"
import { COLORS } from "../../constants"
import { Task } from "../../models"

const TaskCardStyle = styled.div`
  display:flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  background-color: ${COLORS.white};
  padding: 0 16px;
  margin-bottom: 8px;

  > input {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    font-weight: 500;

    &:placeholder {
      color: rgba(0, 32, 63, 0.4);
    }

    &:disabled {
      background-color: ${COLORS.white};
    }

    &.done {
      text-decoration: line-through;
    }
  }

  > button img {
    width: 20px;
    height: 20px;
  }
`

interface Props {
  content: string
  status: 'done' | 'progress'
  created_at: number | undefined
  onUpdate: (task: Task) => void
  onDelete: () => void
}

const TaskCard: NextPage<Props> = ({ content, status, created_at, onUpdate, onDelete }) => {
  const [value, setValue] = useState(content)
  const [isDone, setIsDone] = useState(status === 'done')
  const [isEdit, setIsEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const updateTask = (statusChanged = false) => {
    if (value) {
      let isTaskDone = isDone

      // Check if task status is changed
      if (statusChanged) {
        isTaskDone = !isTaskDone
        setIsDone(isTaskDone)
      }

      const task: Task = {
        content: value,
        status: isTaskDone ? 'done' : 'progress',
        updated_at: Date.now(),
        created_at
      }

      onUpdate(task)
    }
  }

  const startEdit = () => {
    setIsEdit(true)
    if (inputRef.current) {
      const input = inputRef.current
      setTimeout(() => input.focus())
    }
  }

  const stopEdit = () => {
    setIsEdit(false)
    updateTask()
  }

  return (
    <TaskCardStyle className="card">
      <button onClick={() => updateTask(true)}>
        <img src={`/icons/${isDone ? 'checked' : 'unchecked'}.svg`} alt="status" />
      </button>
      <input
        type="text"
        placeholder="Task name"
        onChange={e => setValue(e.target.value)} value={value}
        className={isDone && !isEdit ? 'done' : ''}
        ref={inputRef}
        disabled={!isEdit}
      />

      {isEdit ?
        <button onClick={stopEdit}>
          <img src="/icons/check.svg" alt="check" />
        </button>
        :
        <div>
          <button className="mr-16" onClick={startEdit}>
            <img src="/icons/edit.svg" alt="edit" />
          </button>
          <button onClick={onDelete}>
            <img src="/icons/delete.svg" alt="delete" />
          </button>
        </div>
      }
    </TaskCardStyle>
  )
}

export default TaskCard