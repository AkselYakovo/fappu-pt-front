import SafeToggle from './SafeToggle'

function Header() {
  return (
    <header className="container-fluid px-0">
      <nav className="navbar bg-primary px-3">
        <h1 className="text-light h4 mb-0">Fappu&rsquo;s Price Tracker</h1>
        <ul className="nav">
          <li className="nav-item">
            <SafeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
