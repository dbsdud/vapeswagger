import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';

class Top extends Component{
  
    render(){
        return (
            <Fragment>
                <header id="header" className="adminContent">
                    <nav className="adminNavbar">
                        <div className="adminContainer-fluid">
                            <div className="adminNavbar-header">
                                <img className="adminNavbar-left" src="http://placehold.it/200x200" />
                                <Link className="adminNavbar-brand" to="/">Tobaco</Link>
                            </div>
                            <div className="adminCollapse adminNavbar-collapse">
                                <ul className="adminNav adminNavbar-nav adminNavbar-right adminList-inline">
                                    <li><Link className="adminNavbar-brand"to="/"><img className="adminNavbar-left" src="http://placehold.it/20x20" /></Link></li>
                                    <li className="adminDropdown">
                                        <a href="#" className="adminDropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">UserName <span className="adminCaret"></span></a>
                                        <ul className="adminDropdown-menu" role="menu">
                                            <li><a href="#">내 정보</a></li>
                                            <li><a href="#">로그아웃</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </Fragment>
        )
    }
}

export default Top;