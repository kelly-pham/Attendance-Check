import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AIIcons from "react-icons/ai";
import * as IOIcons from "react-icons/io";
import * as BSIcons from "react-icons/bs";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon:  <AIIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Add Collection to Class ID',
        path: '/add',
        icon:  <AIIcons.AiOutlineAppstoreAdd/>,
        cName: 'nav-text'
    },
    {
        title: 'Checking Attendance',
        path: '/check',
        icon:  <BSIcons.BsFillPersonCheckFill />,
        cName: 'nav-text'
    }
    
]