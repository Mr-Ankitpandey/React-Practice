
import { Provider } from 'react-redux'
import ReduxFilter from '../components/ReduxFilter'
import ReduxUser from '../components/ReduxUser'
import { store } from '../redux/store'

const ReduxPage = () => {
  return (
    <Provider store={store}>
      <h1>Redux</h1>
      <ReduxUser />
      <ReduxFilter />
    </Provider>
  )
}

export default ReduxPage
