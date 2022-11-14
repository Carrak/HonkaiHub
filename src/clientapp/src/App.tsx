import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import './css/Mobile.css';
import './css/Layout.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calculator from './components/Calculator';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<Layout />}>
                        <Route path="calculator" element={<Calculator />} />
                        <Route path="*" element={<p className="content white notfound">Sorry, this page does not exist.</p>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
