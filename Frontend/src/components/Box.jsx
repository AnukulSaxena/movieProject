import React from "react";

function Box(props) {

    const boxStyle = {
        backgroundColor: props.isClicked ? 'lightblue' : 'white',
    };

    return (
        <div className="box" style={boxStyle} onClick={props.onClick}>
            <img src={props.mImg} alt={props.mTitle} className="movie-image" />
            <div className="movie-details">
                <h2 className="title">{props.mTitle}</h2>
                <p className="genre">{props.mGenre}</p>
            </div>
        </div>
    );
}

export default Box;
