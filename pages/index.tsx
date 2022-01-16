import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
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
import { createTask, deleteTask, fetchTasks, sortTasks, updateTask } from "../app/store/slices/tasks"
import { GlobalStyles } from "../app/styles/global"
import { BigText, GreenText, Header, Headline, HideOnMobile, OrangeText, SortWrapper, ToolbarWrapper, Wrapper } from "../app/styles/home"
import { darkTheme, lightTheme } from "../app/theme"

const Home: NextPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sortBy, setSortBy] = useState<string>()
  const [isOrderAsc, setIsOrderAsc] = useState(true)
  const [keyword, setKeyword] = useState<string | null>(null)

  const dispatch = useAppDispatch()
  const tasksState = useAppSelector(state => state.tasks)
  const tasks = tasksState.entities

  const sortParams = [
    { name: 'Alphabetical', key: 'alphabetical' },
    { name: 'Length', key: 'length' },
    { name: 'Date', key: 'date' }
  ]

  // Get saved theme choice
  useEffect(() => {
    const isDarkModeSaved = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDarkModeSaved)
  }, [])

  // Get or search tasks
  useEffect(() => {
    dispatch(fetchTasks(keyword))
  }, [dispatch, keyword])

  // Handle sort and order change
  useEffect(() => {
    if (sortBy) {
      dispatch(sortTasks({ key: sortBy, isAsc: isOrderAsc }))
    }
  }, [dispatch, sortBy, isOrderAsc])

  // Toggle theme and save the new version
  const toggleTheme = (): void => {
    setIsDarkMode(prevVal => {
      localStorage.setItem('darkMode', !prevVal ? 'true' : 'false')
      return !prevVal
    })
  }

  // Add a new task
  const handleAddTask = (content: string) => {
    const newTask: Task = {
      content,
      status: 'progress',
      updated_at: Date.now(),
      created_at: Date.now(),
    }

    dispatch(createTask(newTask))
    setKeyword('')
  }

  // Update or delete a task
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
            <SearchBar onValueChange={(value) => setKeyword(value)} />
            <SortWrapper>
              <OrderToggler onChangeOrder={() => setIsOrderAsc(!isOrderAsc)} />
              <Dropdown name="Sort by" icon="sort" items={sortParams} onSelectItem={(key) => setSortBy(key)} />
            </SortWrapper>
          </ToolbarWrapper>
          <AddInput onAddTask={handleAddTask} />
        </div>

        <div className="mt-48">
          {tasks.map(task => (
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
