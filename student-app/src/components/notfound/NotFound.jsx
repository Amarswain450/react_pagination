import React from 'react'
import { Link } from 'react-router-dom'
import "./NotFound.css"

const NotFound = () => {
    return (
        <>
            <div className="not__found__component">
                <div className="not__found__container">
                    <h1>Page Not Found</h1>
                    <Link to="/" className='navigation'>Go To Home Page</Link>
                </div>
            </div>
        </>
    )
}

export default NotFound
