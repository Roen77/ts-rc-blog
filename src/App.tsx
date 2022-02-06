import { Layout, Menu } from "antd";
import {
  CommentOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "@pages/Home/index";
import "./App.css";
import BasicReact from "@pages/BasicReact/index";
import BasicVue from "@pages/BasicVue/index";
import StateRedux from "@pages/StateRedux/index";
import Work from "@pages/Work/index";
import Compare from "@pages/Compare/index";
import BasicWebpack from "@pages/BasicWebpack/index";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        {/* defaultOpenKeys={['sub1']} */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["3"]}>
          <SubMenu key="sub1" icon={<CommentOutlined />} title="리엑트">
            <Menu.Item key="rp_1">
              <Link to="/basic/react">기본</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<CommentOutlined />} title="뷰">
            <Menu.Item key="vp_1">
              {" "}
              <Link to="/basic/vue">뷰</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="project" icon={<CommentOutlined />} title="프로젝트">
            <SubMenu key="project1" title="리엑트">
              <Menu.Item key="p1">프로젝트1</Menu.Item>
              <Menu.Item key="p2">프로젝트2</Menu.Item>
            </SubMenu>
            <SubMenu key="project2" title="뷰">
              <Menu.Item key="p3">프로젝트1</Menu.Item>
              <Menu.Item key="p4">프로젝트2</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub3" icon={<CommentOutlined />} title="타입스크립트">
            <SubMenu key="sub3_2" title="리엑트">
              <Menu.Item key="t_1">기본</Menu.Item>
            </SubMenu>
            <Menu.Item key="t_3">뷰</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<CommentOutlined />} title="오류해결">
            <Menu.Item key="s_1">리엑트</Menu.Item>
            <Menu.Item key="s_2">뷰</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<CommentOutlined />} title="상태관리">
            <SubMenu key="sub5_1" title="리엑트">
              <Menu.Item key="s1">
                {" "}
                <Link to="/state/redux">리덕스</Link>
              </Menu.Item>
              <Menu.Item key="s2">SWR</Menu.Item>
              <Menu.Item key="s3">React-query</Menu.Item>
            </SubMenu>
            <Menu.Item key="s4">Vuex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" icon={<CommentOutlined />} title="비교">
            <Menu.Item key="ex1">
              {" "}
              <Link to="/compare">리엑트와 뷰</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" icon={<CommentOutlined />} title="자바스크립트">
            <Menu.Item key="js1">자바스크립트</Menu.Item>
          </SubMenu>
          <SubMenu key="sub8" icon={<CommentOutlined />} title="웹팩">
            <Menu.Item key="webpack">
              <Link to="/basic/webpack">기본</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub9" icon={<CommentOutlined />} title="할일">
            <Menu.Item key="work">
              {" "}
              <Link to="/today">오늘 할일</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-background"
          style={{ padding: 0, fontSize: "22px" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          블로그
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 15,
          }}
        >
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/basic/react" component={BasicReact}></Route>
            <Route path="/basic/vue" component={BasicVue}></Route>
            <Route path="/basic/webpack" component={BasicWebpack}></Route>
            <Route path="/compare" component={Compare}></Route>
            <Route path="/state/redux" component={StateRedux}></Route>
            <Route path="/today" component={Work}></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
