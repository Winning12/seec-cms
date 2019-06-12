import React,{Component} from "react";
import * as Pages from "../pages";
import AudienceLayout from '../components/layouts/AudienceLayout'
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
    signInVisible:state.modalReducer.signInVisible,
    signUpVisible:state.modalReducer.signUpVisible,
    keyword: state.keywordReducer.keyword,
})

var wrap = (component) => {
    return Form.create()(connect(mapStateToProps)(withRouter(component)))
}

const mainRoutes = [//默认路由（其实是第二层，第一层在隔壁index.jsx用来加载外层layout
    {
        path: "/user",
        icon: 'user',
        component: AudienceLayout,
        children:[
            {
                path: "/home",
                icon: 'home',
                component: wrap(Pages.Audience.Home),
            },
            {
                path: "/films",
                icon: 'films',
                component: wrap(Pages.Audience.FilmList),
            },
            {
                path: "/schedule",
                icon: 'schedule',
                component: wrap(Pages.Audience.Schedule),
                auth:true
            },
            {
                path: "/orders",
                icon: 'orders',
                component: wrap(Pages.Audience.OrderList),
                auth:true
            },
            {
                path: "/search",
                icon: 'search',
                component: wrap(Pages.Audience.Search)
            },
        ]
    },
    {
        path: "/sales",
        icon: 'sales',
        component: Pages.Sales.Schedule,
    }
    // {
    //     path: "/signin",
    //     icon: 'signin',
    //     component: wrap(Pages.SignIn),
    // },
    // use Drawer Instead
];

export default mainRoutes;

const userRoutes = _.find(mainRoutes, { path: '/user'}).children;
export {userRoutes}