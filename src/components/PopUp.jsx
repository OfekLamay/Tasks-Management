import React from 'react'
import { useState } from 'react';

export default function PopUp(props) {

    // close = {f()}
    // isTimed = {bool}
    // info ={
    // name: string
    // content: <p>ACTUAL CONTENT</p>
    // }

    const [seconds, setSeconds] = useState(1);

    const performTimedClose = () => {

        if (!(props.isTimed))
        {
            clearInterval(myInterval)
            return;
        }

        setSeconds(seconds + 1);
        if (seconds > 5)
        {
            clearInterval(myInterval)
            props.close()
        }
    }

    const myInterval = setInterval(performTimedClose, 1000);

    const closePopUp = () => {
        props.close();
    }

  return (
    <div id='infoPopup' className='popUpOverlay' onClick={closePopUp}>
        <div className='popUpInfo'>
            <br />
            <div className='popUpContentLabel' onClick={(e) => {e.stopPropagation()}}>
                <div className='popUpCloseLabel' onClick={closePopUp}>X</div>
                {props.info.content}
            </div>
        </div>
    </div>
  )
  
}
