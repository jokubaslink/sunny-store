import Navbar from './Navbar'

type LayoutProp = {
    children: React.ReactNode;
}

function Layout({children}: LayoutProp) {
  return (
    <div className="container">
        <div className="row">
            <Navbar />
            {children}
        </div>
    </div>
  )
}

export default Layout