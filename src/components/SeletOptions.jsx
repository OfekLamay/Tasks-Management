import React, {useEffect, useState} from 'react'

export default function SeletOptions() {

    const [usersToRelateTo, setUsersToRelateTo] = useState([])

    useEffect(()=>{
        fetch('/api/users-only')
        .then(response => response.json())
        .then(data => setUsersToRelateTo(data))
    }, [])


  return (
    <div>
        <select className='selectOptions' name="select" id="selectUser">
            <option key="defaultChooseOption" value="Choose user" selected>Choose user</option>
            {usersToRelateTo.map((user) => {
                return <option key={user.username} value={user.username}>{user.username}</option>
            })}
        </select>
    </div>
  )
}
