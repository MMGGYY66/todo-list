// Todo APP
import generatetodo from './generatetodo'
import './styles/main.scss'

const todoBtn = document.getElementById('todoBtn')
todoBtn.addEventListener('click', generatetodo)

generatetodo()
