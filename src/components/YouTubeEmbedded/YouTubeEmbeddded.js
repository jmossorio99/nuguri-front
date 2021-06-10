import React from 'react';
import classes from './YouTubeEmbedded.module.css';

// Renders the YouTube video for the given embedId
export default function YouTubeEmbeddded(props) {
    return (
        <div className={classes.videoResponsive}>
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${props.embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Embedded youtube"
            />
        </div>
    )
}
