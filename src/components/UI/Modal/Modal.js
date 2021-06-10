import React, {Fragment} from "react";
import {createPortal} from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick} />
}

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        {props.children}
    </div>
}

const portalElement = document.getElementById("overlays");

// Renders a modal with a backdrop
const Modal = (props) => {
    return (
        <Fragment>
            {createPortal(<Backdrop onClick={props.onBackdropClick} />, portalElement)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default Modal;
