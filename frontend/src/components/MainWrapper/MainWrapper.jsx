import { MainAppBar } from '../MainAppBar/MainAppBar'
import { Box } from '@mui/material'

export const MainWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
      }}
    >
      <MainAppBar />
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
