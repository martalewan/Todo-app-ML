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
        overflow: 'hidden',
      }}
    >
      <MainAppBar />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          alignContent: 'flex-start',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
