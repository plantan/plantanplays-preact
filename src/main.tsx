import { render } from 'preact'
import { Banner } from '@components/banner.tsx'
import './main.css'

function App() {
    return <Banner />;
}

render(<App />, document.getElementById('app')!);
