import React from 'react'
import TaskInfo from './TaskInfo'
import { useState } from 'react'
import PopUp from './PopUp'

export default function TaskPreview(props) {

  const [showInfo, setShowInfo] = useState(false)
  const popUpContent = {content: <p>Task is already finished!</p>}

  const closeInfoFunc = () => {
    setShowInfo(false);
    }

  return (
    <div>
      <div onClick={()=>{setShowInfo(true)}} className='taskPreview'>
          <div>
            Task Name:
            <br/>
            {props.taskData.name}
          </div>

          <div>
            User Related To:
            <br/>
            {props.taskData.userRelated}
          </div>
      </div>

      { (showInfo && props.taskData.isDone) ? <PopUp close={closeInfoFunc} isTimed={true} info={popUpContent} /> : 
      showInfo ? <TaskInfo task={props.taskData} show={showInfo} updateTasks={props.updateTasks} close={closeInfoFunc} /> : null}
      
    </div>
    )
}
