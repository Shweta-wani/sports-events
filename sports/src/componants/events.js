import React, { Component } from 'react';
import $ from 'jquery';
import GoogleMapReact from 'google-map-react';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersubscribeTo: this.props.value.subscribeTo,
            showMap: false,
            displayMap: ""
        }
        this.showMap = this.showMap.bind(this);
    }

    componentDidMount() {
        let events = [];
        let eventtype = [];
        const urlevents = "http://localhost:3000/events";
        const urleventtype = "http://localhost:3000/eventtype";

        fetch(urleventtype)
            .then(response => response.json())
            .then(res => {
                $.each(this.state.usersubscribeTo, function (i, val) {
                    $.each(res.eventtype, function (index, value) {
                        if (val.toLowerCase() === value.id.toLowerCase()) {
                            eventtype.push({
                                id: value.id,
                                name: value.name
                            });
                        }
                    });
                })
                this.setState(() => ({ eventtype }));
            }).catch(() => console.log("Can’t access " + urleventtype + " response. Blocked by browser?"));


        fetch(urlevents)
            .then(response => response.json())
            .then(res => {
                $.each(this.state.eventtype, function (i, val) {
                    $.each(res.events, function (index, value) {
                        if (val.name.toLowerCase() === value.name.toLowerCase()) {
                            events.push({
                                id: value.id,
                                name: value.name,
                                description: value.description,
                                start: value.start,
                                end: value.end,
                                location: value.location
                            });
                        }
                    });
                })
                this.setState(() => ({ events }));
            }).catch(() => console.log("Can’t access " + urlevents + " response. Blocked by browser?"));
    }

    showMap(location) {
        
        this.setState({ showMap: true, displayMap: location });
    }

    render() {
        let { events, showMap, displayMap } = this.state;
        let eventList;
        const uluru = { lat: -25.344, lng: 131.036 };

        if (events !== undefined) {
            eventList = events.map((item, index) => {
                return (
                    <tbody key={item.id}>
                        <tr key={item.id + index}>
                            <td key={item.name + index}>
                                {item.name}
                            </td>
                            <td key={item.description + index}>
                                {item.description}
                            </td>
                            <td key={item.start + index}>
                                {item.start}
                            </td>
                            <td key={item.end + index}>
                                {item.end}
                            </td>
                            <td key={item.location + index}>
                                {item.location}
                            </td>
                            <td key={item.location + index + "map"}>
                                <i className="fas fa-map-marker m-2"
                                    aria-hidden="true"
                                    onClick={(e) => this.showMap(item.location)}
                                >
                                </i>
                            </td>
                        </tr>
                    </tbody>
                )
            })
        }

        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <table className="table table-bordered eventtable">
                        <thead>
                            <tr>
                                <th><label>Event Type </label> </th>
                                <th><label>Event Description </label> </th>
                                <th><label>Event Start </label> </th>
                                <th><label>Event End </label> </th>
                                <th><label>Event Location</label> </th>
                                <th><label>Map</label> </th>
                            </tr>
                        </thead>
                        {eventList}
                    </table>
                </div>
                {showMap ?
                    <div className="row d-flex justify-content-center">
                        {displayMap}

                        <div style={{ height: '50vh', width: '100%' }}>
                            <GoogleMapReact
                                id="map"
                                defaultCenter={uluru}
                                defaultZoom={4}
                                yesIWantToUseGoogleMapApiInternals
                            >
                                <i id="marker" className="fas fa-map-marker m-2"
                                    aria-hidden="true" lat={59.955413}
                                    lng={30.337844}
                                    text="My Marker"></i>
                            </GoogleMapReact>
                        </div>
                    </div> : null}
            </div>
        );
    }
}

export default Events;