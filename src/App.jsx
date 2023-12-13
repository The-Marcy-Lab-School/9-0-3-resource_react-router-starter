import { useState, useEffect } from 'react'
import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom'

// Here is the React Router V5 syntax main points
// You are more than welcome to try V6, it's just a little tougher for benefits we don't really care about
const users = [
  { id: 1, name: 'Zo', bio: 'One cool dude' },
  { id: 2, name: "Maya", bio: 'Our co-founder' },
  { id: 3, name: "Itzel", bio: 'Truly awesome' },
];

function HomePage({ exampleParam }) {
  return <div>
    <h1>Home!</h1>
    <p>Example Param: {exampleParam}</p>
  </div>
}

function UsersPage() {
  return <div>
    <h1>Users</h1>
    <ul>
      {
        users.map(({id, name, bio}) => <li key={id}>
          <Link to={`/users/${id}`}>{name}</Link>
          <p>{bio}</p>
        </li>)
      }
    </ul>
  </div>
}

function UserPage() {
  const [user, setUser] = useState({});
  const { userId } = useParams(); // useParams gives you access to the params in the URL
  const navigate = useNavigate(); // useNavigate allows you to programmatically redirect a user to a new route

  useEffect(() => {
    const apiUser = users.find(({id}) => id === Number(userId));
    apiUser ? setUser(apiUser) : navigate('/users')
  }, [userId, navigate]);

  const { name, bio } = user;

  return <div>
    <h1>{name}</h1>
    <p>{bio}</p>
  </div>
}

function App() {
  return <>
    <nav> {/* The Nav will now appear on every page as it's outside the routes */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/users">Users</Link></li>
      </ul>
    </nav>
    <main>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        {/* Dynamic routing is done with a colon and then the value name, access with useParams */}
        <Route path="/users/:userId" element={<UserPage />} />
        <Route path="/" element={<HomePage exampleParam="Look at me!" />} />
        {/* the * will match anything */}
        <Route path="*" element={<div><h1>Not Found!</h1></div>} />
      </Routes>
    </main>
  </>
}

export default App
