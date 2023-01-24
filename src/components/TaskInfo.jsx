import React from 'react'

export default function TaskInfo(props) {

  // id: Number
  // name: String,
  // userRelated: String,
  // description: String,
  // isDone: Boolean

  const endTask = () => {
      
    fetch('/api/end-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tID: props.task.id })
      })
      .then(response => response.json())
      .then(res => {
        if (res.isDone)
            alert(res.message);
        else
            alert(res.message);
        }
      )
    
    closePopUp()
    props.updateTasks(props.task.id);
  }

  const closePopUp = async () => {
    await props.close()
  }

  if (!props.show)  
  {
    return null;
  } 
  return (
    <div className='overlay'>
      <div className='taskInfo'>
        <div className='taskCloseLabel' onClick={closePopUp}>X</div>
        <br />
        <div className='taskNameLabel'>{props.task.name}</div>
        <br /> 
        <div className='taskDataLabel'>{props.task.description}</div>
        <br /> 
        <button className='clickbtn' onClick={endTask}>End task</button>
      </div>
    </div>
  )
}
