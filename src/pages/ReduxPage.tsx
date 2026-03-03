
import { Provider } from 'react-redux'
import ReduxFilter from '../components/ReduxFilter'
import ReduxUser from '../components/ReduxUser'
import { store } from '../redux/store'

const ReduxPage = () => {
  return (
    <>
    <h1>Redux</h1>
    <Provider store={store}>
      <ReduxUser/>
      <ReduxFilter/>
      </Provider>
    </>
  )
}

export default ReduxPage
