import classes from "./TitleItem.module.css";

const TitleItem = (props) => {
        return (
            <h5 className={classes.title} onClick={props.onClick}>{props.children}</h5>
        )
}

export default TitleItem;


