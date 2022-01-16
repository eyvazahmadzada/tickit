import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { ThemeProvider, useTheme } from "styled-components"
import AddInput from "../app/components/elements/AddInput"
import Dropdown from "../app/components/elements/Dropdown"
import OrderToggler from "../app/components/elements/OrderToggler"
import SearchBar from "../app/components/elements/SearchBar"
import Spinner from "../app/components/elements/Spinner"
import Switcher from "../app/components/elements/Switcher"
import TaskCard from "../app/components/elements/TaskCard"
import Toast from "../app/components/elements/Toast"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Task } from "../app/models"
import { createTask, deleteTask, fetchTasks, updateTask } from "../app/store/slices/tasks"
import { GlobalStyles } from "../app/styles/global"
import { BigText, GreenText, Header, Headline, HideOnMobile, OrangeText, SortWrapper, ToolbarWrapper, Wrapper } from "../app/styles/home"
import { darkTheme, lightTheme } from "../app/theme"

const Home: NextPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const dispatch = useAppDispatch()
  const tasksState = useAppSelector(state => state.tasks)

  // Toggle theme and save the new version
  const toggleTheme = (): void => {
    setIsDarkMode(prevVal => {
      localStorage.setItem('darkMode', !prevVal ? 'true' : 'false')
      return !prevVal
    })
  }

  // Get saved theme choice
  useEffect(() => {
    const isDarkModeSaved = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDarkModeSaved)

    dispatch(fetchTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sortParams = [
    { name: 'Name', key: 'name' },
    { name: 'Length', key: 'length' },
    { name: 'Date', key: 'date' }
  ]

  const handleSort = (key: string) => {
    console.log(key)
  }

  const handleOrder = (isAsc: boolean) => {
    console.log(isAsc)
  }

  const handleSearch = (value: string) => {
    // console.log(value)
  }

  const handleAddTask = (content: string) => {
    const newTask: Task = {
      content,
      status: 'progress',
      updated_at: Date.now(),
      created_at: Date.now(),
    }

    dispatch(createTask(newTask))
  }

  const handleUpdateTask = (id: number, task: Task) => dispatch(updateTask({ id, task }))

  const handleDeleteTask = (id: number) => dispatch(deleteTask(id))

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />

      {tasksState.loading ? <Spinner /> : null}
      <Toast type="success" message={tasksState.success} />
      <Toast type="error" message={tasksState.error} />
      <Wrapper>
        <Header>
          <Headline>
            <BigText>
              <GreenText>TICK</GreenText>
              <OrangeText>IT!</OrangeText>
            </BigText>
            <HideOnMobile className="ml-8">- now you know what <GreenText>to do</GreenText></HideOnMobile>
          </Headline>

          <Switcher name="darkMode" onToggle={toggleTheme} isChecked={isDarkMode} />
        </Header>

        <div className="mt-32">
          <ToolbarWrapper className="mb-16">
            <SearchBar onValueChange={handleSearch} />
            <SortWrapper>
              <OrderToggler onChangeOrder={handleOrder} />
              <Dropdown name="Sort by" icon="sort" items={sortParams} onSelectItem={handleSort} />
            </SortWrapper>
          </ToolbarWrapper>
          <AddInput onAddTask={handleAddTask} />
        </div>

        <div className="mt-48">
          {tasksState.entities.map(task => (
            <TaskCard
              key={task.id}
              content={task.content}
              status={task.status}
              created_at={task.created_at}
              onUpdate={(updatedTask: Task) => handleUpdateTask(task.id || 0, updatedTask)}
              onDelete={() => handleDeleteTask(task.id || 0)}
            />
          ))}
        </div>
      </Wrapper>
    </ThemeProvider >
  )
}

export default Home
