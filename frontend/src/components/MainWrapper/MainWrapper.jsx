import { MainAppBar } from '../MainAppBar/MainAppBar'
import * as S from './MainWrapper.style'

export const MainWrapper = ({ children }) => {
  return (
    <S.MainWrapperRoot>
      <MainAppBar />
      <S.CenterContentWrapper>
        <S.ContentWrapper>{children}</S.ContentWrapper>
      </S.CenterContentWrapper>
    </S.MainWrapperRoot>
  )
}
