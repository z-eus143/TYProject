import {useNavigate} from 'react-router-dom'

export const Nav = () => {
    const navigate = useNavigate();
    return(<>
        <header>
        <h1>Admin Panel</h1>
      </header>
      <nav>
        <ul>
          <li onClick={() => navigate("/")}><a href="#"><i class="fas fa-home icon"></i> Dashboard</a></li>
          <li><a href="#" onClick={() => navigate("property")}><i class="fas fa-building icon"></i> Properties</a></li>
          <li onClick={() => navigate("user")}><a href="#"><i class="fas fa-users icon"></i> Users</a></li>
          <li><a href="#"><i class="fas fa-chart-line icon"></i> Analytics</a></li>
        </ul>
      </nav>
      </>
    )
}