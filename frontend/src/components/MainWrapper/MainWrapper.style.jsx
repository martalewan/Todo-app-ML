import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const MainWrapperRoot = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})

export const CenterContentWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
})

export const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '80rem',
  flexGrow: 1,
})
