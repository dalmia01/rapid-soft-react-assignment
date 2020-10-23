import React from "react";
import "./_index.css";
import Button from "../Button";
import OverViewItem from "./OverViewItem";
import TripDetails from "../TripDetails";

const DashBoard = (props) => {
    /** setting local states */
    let [tripDetails, setTripDetails] = React.useState({});
    let [calenderStartDate, setCalenderStartDate] = React.useState("");
    let [calenderEndDate, setCalenderEndDate] = React.useState("");

    /** formatting time into hh:mm format */
    const getTime = (d) => {
        return `${d.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;
    };

    /** format date into dd/mm/yy format */
    function formattedDate(d = new Date()) {
        return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
            .map((n) => (n < 10 ? `0${n}` : `${n}`))
            .join("/")
            .concat(` at ${getTime(d)}`);
    }

    /** to calculate total trip time - trip wise */
    const getTotalTimeTrip = (startDate, endDate) => {
        var seconds = Math.floor((endDate - startDate) / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        hours = hours - days * 24;
        minutes = minutes - days * 24 * 60 - hours * 60;
        seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

        return `${hours} Hrs ${minutes} Minutes`;
    };

    /** to fetch trip details from api */
    const fetchTripDetails = async () => {
        let response = await fetch("http://amazon.watsoo.com/watsoo-amazon-api//trip-controller-web/v1/vehicle/wise/summary/36", {
            method: "POST",
            body: JSON.stringify({
                clientId: 10,
                dataRecord: {
                    userRoleId: 4,
                    userRoleName: "COMPANY",
                    userId: 10,
                },
                fromDate: 1577888571659,
                toDate: 1593613371659,
                tripId: 36,
            }),
        });

        let responseText = await response.json();
        let data = responseText.data;
        setTripDetails(data);
    };

    /** on initial render fetch details by call an async function */
    React.useEffect(() => {
        fetchTripDetails();
    }, []);

    /** on click change start date */
    const startDateChangeHandler = (e) => {
        setCalenderStartDate(e.target.value);
    };
    /** on click change end date */
    const endDateChangeHandler = (e) => {
        setCalenderEndDate(e.target.value);
    };
    /** collapse table funtionality */
    const collapseHandler = (e) => {
        if (e.target.closest(".trip-item-details-complete").nextElementSibling.style.display === "none") {
            e.target.closest(".trip-item-details-complete").nextElementSibling.style.display = "block";
            e.target.innerHTML = "-";
        } else {
            e.target.closest(".trip-item-details-complete").nextElementSibling.style.display = "none";
            e.target.innerHTML = "+";
        }
    };
    /** on button click show an alert*/
    const btnClickHandler = () => {
        alert("The button is clicked");
    };

    return (
        <div className="dashboard">
            <div className="dahbaord-header">
                <div className="dashboard-details">
                    <div className="dashboard-name">
                        <h3>Trip Summary</h3>
                    </div>
                    <div className="breadcrumb-links">
                        <small>
                            <span className="highlight">DashBoard</span> / Trip Summary
                        </small>
                    </div>
                </div>
                <div className="filter-section">
                    <div className="date start-date">
                        <div className="group">
                            <label>From</label>
                            <input type="date" onChange={startDateChangeHandler} />
                        </div>
                    </div>
                    <div className="date end-date">
                        <div className="group">
                            <label>To</label>
                            <input type="date" onChange={endDateChangeHandler} />
                        </div>
                    </div>
                    <div className="search">
                        <Button iconName="fa-search" color="#01c5c4" />
                    </div>
                    <div className="export">
                        <Button iconName="fa-upload" btnText="Export" outLineInColor="#01c5c4" />
                    </div>
                </div>
            </div>
            {Object.keys(tripDetails).length > 0 && (
                <React.Fragment>
                    <div className="cards-details">
                        <div className="overview-details">
                            <OverViewItem iconName="fa-truck" itemText={tripDetails.vehicleNo} color="#01c5c4" />
                            <OverViewItem iconName="fa-truck" itemText={tripDetails.totalTrips} itemName="Total Trips" color="#c2993b" />
                            <OverViewItem
                                iconName="fa-tachometer"
                                itemText={tripDetails.totalKm + " KM"}
                                itemName="Total KM"
                                color="#005a93"
                            />
                            <OverViewItem
                                iconName="fa-money"
                                itemText={"Rs." + tripDetails.otherExpenses}
                                itemName="Other Exp"
                                classNameText="item-4"
                                color="#000000"
                            />
                            <OverViewItem
                                iconName="fa-clock-o"
                                itemText={new Date(tripDetails.totalTripTime * 1000).toISOString().substr(11, 8)}
                                itemName="Trip Time"
                                color="#00a74b"
                            />
                            <OverViewItem
                                iconName="fa-clock-o"
                                itemText={new Date(tripDetails.totalTime * 1000).toISOString().substr(11, 8)}
                                itemName="Total Time"
                                color="#962297"
                            />
                            <OverViewItem
                                iconName="fa-money"
                                itemText={"Rs." + tripDetails.totalExpences}
                                itemName="Total Exp"
                                color="#6a5718"
                            />
                        </div>
                    </div>

                    <TripDetails
                        tripDetails={tripDetails}
                        getTime={getTime}
                        formattedDate={formattedDate}
                        getTotalTimeTrip={getTotalTimeTrip}
                        btnClickHandler={btnClickHandler}
                        collapseHandler={collapseHandler}
                        calenderStartDate={calenderStartDate}
                        calenderEndDate={calenderEndDate}
                    />
                </React.Fragment>
            )}
        </div>
    );
};

export default DashBoard;
