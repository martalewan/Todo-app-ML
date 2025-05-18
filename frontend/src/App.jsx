import { TodoManager } from './components/TodoManager/TodoManager'
import { MainWrapper } from './components/MainWrapper/MainWrapper'

const App = () => {
  return (
    <MainWrapper>
      <TodoManager style={{ margin: '1rem' }} />
    </MainWrapper>
  )
}

export default App
