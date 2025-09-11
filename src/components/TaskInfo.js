import React from 'react'
import { useSelector } from 'react-redux';

const TaskInfo = (props) => {
  const currentUser = useSelector(state => state.user.username);
  if (!props.show) return null;

  // Props' task has:
  // id: Number
  // name: String,
  // userRelated: String,
  // description: String,
  // isDone: Boolean
  // teamNumber: Number

  const endTask = async () => {
    if (window.confirm("Are you sure you want to end this task?")) {
      await fetch('/api/end-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tID: props.task.id, username: currentUser })
      })
      .then(response => response.json())
      .then(res => {
        alert(res.message);
        props.updateTasks(props.task.id);
        closePopUp();
      });
    }
  };

  const closePopUp = async () => {
    await props.close()
  }

  if (!props.show)  
  {
    return null;
  } 

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={props.close} title="Close">&times;</button>
        <h2 className="modal-title">{props.task.name}</h2>
        <div className="modal-section">
          <strong><u>Description</u>:</strong>
          <div>{props.task.description}</div>
        </div>
        <div className="modal-section">
          <strong>Assigned to:</strong> {props.task.userRelated}
        </div>
        <div className="modal-section">
          <strong>Team:</strong> {props.task.teamNumber}
        </div>
        <button className="modal-action" onClick={endTask}>End Task</button>
      </div>
    </div>
  );
}

export default TaskInfo
