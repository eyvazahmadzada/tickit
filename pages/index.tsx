import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { ThemeProvider, useTheme } from "styled-components"
import AddInput from "../app/components/elements/AddInput"
import Dropdown from "../app/components/elements/Dropdown"
import OrderToggler from "../app/components/elements/OrderToggler"
import SearchBar from "../app/components/elements/SearchBar"
import Switcher from "../app/components/elements/Switcher"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Task } from "../app/models"
import { createTask, deleteTask, fetchTasks, updateTask } from "../app/store/slices/tasks"
import { GlobalStyles } from "../app/styles/global"
import { BigText, GreenText, Header, Headline, HideOnMobile, OrangeText, SortWrapper, ToolbarWrapper, Wrapper } from "../app/styles/home"
import { darkTheme, lightTheme } from "../app/theme"

const Home: NextPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const dispatch = useAppDispatch()
  const tasks: Task[] = useAppSelector(state => state.tasks.entities)

  // Toggle theme and save the new version
  const toggleTheme = (): void => {
    setIsDarkMode(prevVal => {
      localStorage.setItem('darkMode', !prevVal ? 'true' : 'false')
      return !prevVal
    })
  }

  useEffect(() => {
    const isDarkModeSaved = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDarkModeSaved)

    // dispatch(fetchTasks())
  }, [])

  const sortParams = [
    { name: 'Name', key: 'name' },
    { name: 'Length', key: 'length' },
    { name: 'Date', key: 'date' }
  ]

  const handleSort = (key: string) => {
    console.log(key)
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />

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
            <SearchBar />
            <SortWrapper>
              <OrderToggler />
              <Dropdown name="Sort by" icon="sort" items={sortParams} onSelectItem={handleSort}
              />
            </SortWrapper>
          </ToolbarWrapper>
          <AddInput />
        </div>

        <div>
          {/* <Task /> */}
        </div>
      </Wrapper>
    </ThemeProvider >
  )
}

export default Home
