import React from 'react'

function Navbar() {
    return (
        <>
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    <a href='!#' className="navbar-brand">Navbar</a>
                    <form className="d-flex" role="search">
                            <a href='/' className="btn btn-outline-success" type="submit">Logout</a>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default Navbar