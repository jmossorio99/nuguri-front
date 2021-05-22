import React, { Component } from 'react'
import TitleItem from '../Layout/TitleTableItems/TitleItem';
import "./MusicTable.css";

export default class MusicTable extends Component {

    constructor(){
        super();
        this.state = {
            songs:[
                {
                    id:"1",
                    tittle:"Don",
                    artist:"Miranda",
                    album:"En vivo sin restricciones!",
                    rating:"7",
                    rates:"5"
                },
                {
                    id:"2",
                    tittle:"Perfect",
                    artist:"Ed Sheeran",
                    album:"÷ (divide)",
                    rating:10,
                    rates:50
                }
            ],
        }
    }

    renderSongs(){
        let list = this.state.songs.map((song) =>(
            <tr key={song.id}>
                <td>{song.tittle}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.rating}</td>
                <td>{song.rates}</td>
            </tr>
        ));
        return list;
    }

    render() {
        return (
            <table className="content-table">
                <thead>
                    <tr>
                        <th><TitleItem>Title</TitleItem></th>
                        <th><TitleItem>Artist</TitleItem></th>
                        <th><TitleItem>Album</TitleItem></th>
                        <th><TitleItem>Rating</TitleItem></th>
                        <th><TitleItem>Rates</TitleItem></th>
                    </tr>
                </thead>
                <tbody>{this.renderSongs()}</tbody>
            </table>
        )
    }
}
