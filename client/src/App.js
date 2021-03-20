import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './styles/index.scss';
import Home from './pages/home';
import Tune from './pages/tune';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/tunes/:tuneId">
          <Tune />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
