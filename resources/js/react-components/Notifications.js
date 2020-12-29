import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js'

window.Pusher = Pusher;

export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            NOTIFICATION_TYPES: {
                journeyLiked: 'App\\Notifications\\JourneyLiked'
            }
        };
    }

    componentDidMount() {
        axios
            .get('/notifications')
            .then(res => {
                this.setState({
                    ...this.state,
                    notifications: res.data
                });
            })
            .then(() => {
                const echo = new Echo({
                    broadcaster: 'pusher',
                    key: process.env.MIX_PUSHER_APP_KEY,
                    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
                    forceTLS: true
                });
        
                if(uId) {
                    echo.private(`App.Models.User.${uId}`)
                        .notification(notification => {
                            console.log(notification, this.state.notifications);
                            this.setState({
                                ...this.state,
                                notifications: [notification, ...this.state.notifications]
                            })
                        });
                }
            })
            .catch(err => console.error(err));
    }


    render() {
        const { notifications, NOTIFICATION_TYPES } = this.state
        return (
            <Fragment>
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Notifications { `(${notifications.length})` }
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    { notifications.length == 0 && <a className="dropdown-item" href="#">No new notifications</a> }
                    { notifications.length > 0 && 
                        <Fragment>
                            {
                                notifications.map(e => 
                                        e.type == NOTIFICATION_TYPES.journeyLiked && 
                                        <div key={e.id}>
                                            <a className="dropdown-item" href="#">{ e.data.sender_user_name } liked your journey</a>
                                        </div>          
                                )
                            }
                        </Fragment>
                    } 
                </div> 
            </Fragment>
        )
    }
}


const ntfs = document.querySelector('.notifications');
const uId = document.querySelector("meta[name='user-id']").getAttribute('content');
ReactDOM.render(<Notifications uId={uId}/>, ntfs);