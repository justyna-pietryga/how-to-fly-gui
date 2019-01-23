import { Menu, Icon, Switch } from 'antd';
// import * as ReactDOM from "antd";
import React from 'react';
import * as ReactDOM from "antd";
import {NavLink} from 'react-router-dom'

const SubMenu = Menu.SubMenu;

export default class Sider extends React.Component {
    state = {
        theme: 'light',
        current: '1',
    };

    changeTheme = (value) => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <div style={{width: 256}}>
                {/*<Switch*/}
                    {/*checked={this.state.theme === 'dark'}*/}
                    {/*onChange={this.changeTheme}*/}
                    {/*checkedChildren="Dark Mode"*/}
                    {/*unCheckedChildren="Light Mode"*/}
                    {/*style={{marginLeft:"auto", marginRight: "auto"}}*/}
                {/*/>*/}
                <br />
                <br />
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 256 }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Change User Details</span></span>}>
                        <Menu.Item key="1"><NavLink to="/my-account/change-password">Change Password</NavLink></Menu.Item>
                        <Menu.Item key="2"><NavLink to="/my-account/change-username">Change Username</NavLink></Menu.Item>
                        <Menu.Item key="3"><NavLink to="/my-account/change-details">Change User Details</NavLink></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5"><NavLink to="/my-account/reservations">History of reservations</NavLink></Menu.Item>
                </Menu>
            </div>
        );
    }
}