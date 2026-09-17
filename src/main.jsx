import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './extras.css'
import './about.css'
import './experience.css'
import './contact.css'
import './projects.css'
import './responsive.css'

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
