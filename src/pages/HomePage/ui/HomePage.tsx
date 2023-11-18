import { FC } from 'react'
import SideBar from '../../../shared/SideBar'
import { Container } from 'react-bootstrap'

const HomePage: FC = () => {
    return (
        <Container className='mt-5 d-flex'>
            <SideBar />
            <h1>Welcome to Home</h1>
        </Container>
    )
}

export default HomePage
