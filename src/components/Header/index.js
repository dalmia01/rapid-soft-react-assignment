import React from "react";
import appLogo from "../../assets/images/app-logo.png";
import "./_index.css";
import Button from "../Button";

export default class Header extends React.Component {

    btnClickHandler () {
        alert('The button is clicked')
    }

    render() {
        return (
            <div className="header">
                <div className="left-container">
                    <div className="hamburger-icon">
                        <i className="fa fa-bars"></i>
                    </div>
                    <div className="logo">
                        <img src={appLogo} alt="app logo" />
                    </div>
                </div>
                <div className="right-container">
                    <div className="btn logout-btn">
                        <Button iconName="fa-power-off" btnText="Logout" btnClickHandler={this.btnClickHandler} inColor='#000' />
                    </div>
                </div>
            </div>
        );
    }
}
