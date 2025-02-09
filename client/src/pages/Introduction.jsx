import { Link } from "react-router-dom"

const Introduction = () => {
  return (
    <div>
      <p>Welcome to our Posting App! Easily create and share posts anytime. Simple, fast, and user-friendly. Start posting now! 🚀</p><br/>
      <Link to='/register'><button>Sign up</button></Link><br/>
      <Link to='/login'><button>Sign in</button></Link>
    </div>
  )
}

export default Introduction
