import React, { useState } from 'react'

import {AiOutlineExpandAlt} from 'react-icons/ai'
import {CgMinimizeAlt} from 'react-icons/cg'

import {Controlled} from 'react-codemirror2'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'

import './Editor.css'

const Editor = ({language, value, name, onChange, icon, labelColor}) => {

    const [open, setOpen] = useState(true)

    function handleChange(value) {
        onChange(value)
      }

    return (
      <div className={`container ${open ? '' : 'collapsed'}`}>
        <div className='heading'>
          <div className='label_wrapper'>
            <div style={{color: labelColor}} className='icon'>{icon}</div>
            <div className='name'>{name}</div>
          </div>    
        </div>
        <div className={`editor-container`}>
          <Controlled
            onBeforeChange={(editor, data, value)=>handleChange(value)}
            value={value}
            className='editor'
            options={{
              lineWrapping: true,
              lint: true,
              mode: language,
              theme: 'material',
              lineNumbers: true,
              scrollbarStyle: null,
              autocorrect: true,
            }}
          />
          <div onClick={()=>setOpen(!open)} className='expand-btn'>
            {open ? <CgMinimizeAlt/> : <AiOutlineExpandAlt/>}
          </div>
        </div>
      </div>
    )
}

export default Editor
