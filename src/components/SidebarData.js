import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AIIcons from "react-icons/ai";
import * as IOIcons from "react-icons/io";
import * as BSIcons from "react-icons/bs";
import * as CGIcon from "react-icons/cg";
import {Auth} from "aws-amplify";
export const SidebarData = [
    // {
    //     title: `Hello ${Auth.user.username}`,
    //     icon: <CGIcon.CgUserlane />,
    //     cName: 'nav-text'
    // },
    {
        title: 'Home',
        path: '/',
        icon:  <AIIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Add Student to Class',
        path: '/add',
        icon:  <AIIcons.AiOutlineAppstoreAdd/>,
        cName: 'nav-text'
    },
    {
        title: 'List Images in Class Collection',
        path: '/list',
        icon:  <AIIcons.AiOutlineOrderedList/>,
        cName: 'nav-text'
    },
    {
        title: 'Checking Attendance',
        path: '/check',
        icon:  <BSIcons.BsFillPersonCheckFill />,
        cName: 'nav-text'
    }
    
]