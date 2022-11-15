import { useState } from "react"


export default function Home() {

  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
  })


  return (
    <div >
      <form>
        <div>
          <label htmlFor="">Full Name</label>
          <input type="text" onChange={e => {
            setForm
          }}/>
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" onChange={e => {
            
          }}/>
        </div>
        <div>          
        <label htmlFor="">Password</label>
        <input type="text" onChange={e => {
            
          }}/>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
