import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Header = () => {

  const authStatus = useSelector((state) => {
    state.auth.status
  })

  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add post',
      slug: '/add-post',
      active: authStatus
    }
  ]

  return (
    <Header className="py-3 shadow bg-gray-500">
      <Container >
        <nav className='flex'>
          <div className='mr-4'>
            <Link to={''}>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>

              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
            
          </ul>
        </nav>
      </Container>
    </Header>
  )
}

export default Header