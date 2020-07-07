import React from 'react';
import SidebarAdmin from "./SidebarAdmin"
import SidebarSubAdmin from "./SidebarSubAdmin"

export const getSidebar = access_level => {
    if(access_level.toLowerCase() === 'administrator') {
        return <SidebarAdmin />
    } else if(access_level.toLowerCase() === 'sub admin') {
        return <SidebarSubAdmin />
    }
}