import classes from "./TitleItem.module.css";

// This component renders an h5 for the table titles
const TitleItem = (props) => {
        return (
            <h5 className={classes.title} onClick={props.onClick}>{props.children}</h5>
        )
}

export default TitleItem;


