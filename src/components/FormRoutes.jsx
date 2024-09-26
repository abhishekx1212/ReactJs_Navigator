import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Feedback from './Feedback'
import Form from '../Form'
import FormData from '../FormData'
import EditForm from '../EditForm'

const FormRoutes = () => {
  return (
    <div>
        <div>
            <Routes>
                <Route path='/' element={<Form />}/>
                <Route path='/feedForm' element={<Feedback />}/>
                <Route path='/userFormData' element={<FormData />}/>
                <Route path='/editData/:id' element={<EditForm />}/>
            </Routes>
        </div>
    </div>
  )
}

export default FormRoutes
