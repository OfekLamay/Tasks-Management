import React, {useEffect, useState} from 'react'

const SelectOptions = (props) => {
    const [usersToRelateTo, setUsersToRelateTo] = useState([])

    useEffect(()=>{
        fetch('/api/team-users-only', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: props.user })
        })
        .then(response => response.json())
        .then(data => setUsersToRelateTo(data))
    }, [props.user])


  return (
    <div>
        <select className='selectOptions' name="select" id="selectUser">
            <option key="defaultChooseOption" value="Choose user" defaultValue={"Choose user"}>Choose user</option>
            {usersToRelateTo.map((user) => {
                return <option key={user.username} value={user.username}>{user.username}</option>
            })}
        </select>
    </div>
  )
}

export default SelectOptions
