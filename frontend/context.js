import React, { createContext, useState } from 'react'

export const TasksContext = createContext();


export const TasksProvider = (props) => {
    let [taskList, setTaskList] = useState([]);

    return (
        <TasksContext.Provider
        value={{taskList, setTaskList
        }}
        >
            {props.children}
        </TasksContext.Provider>
    )
}


