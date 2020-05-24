import React from 'react'
import { Layout } from 'antd';


const { Sider } = Layout;


export default function SideBar() {
    return (
        <Sider width={400} style={{ height: "100vh" }} className="site-layout-background">
            Side bar
        </Sider>
    )
}
