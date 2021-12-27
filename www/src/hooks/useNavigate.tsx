import { useHistory } from 'react-router-dom'

export enum ROUTE {
  home = '/',
  about = '/about',
}

const useNavigate = (route: ROUTE) => {
  const history = useHistory()
  return () => {
    console.log(route)
    history.push(route)
  }
}

export default useNavigate
