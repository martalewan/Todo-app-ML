import { TodoManager } from './components/TodoManager/TodoManager'
import { MainWrapper } from './components/MainWrapper/MainWrapper'
import './app.css'

const App = () => {
  return (
    <MainWrapper>
      <TodoManager style={{ margin: '1rem' }} />
    </MainWrapper>
  )
}

export default App
