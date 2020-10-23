import React from 'react';
import Button from '../Button'

const TripDetails = (props)  => {

    let {tripDetails,formattedDate,getTotalTimeTrip,collapseHandler,getTime,btnClickHandler,calenderStartDate,calenderEndDate} = props;


    let filteredTripDetails = [...tripDetails.tripDetails]
    filteredTripDetails = tripDetails.tripDetails.filter((trip)=>{
        
        if( calenderStartDate !== '' && calenderEndDate !== '' && new Date(calenderStartDate) <= new Date(parseInt(trip.startDay)) && new Date(calenderEndDate) >= new Date(parseInt(trip.startDay))){
            return trip
        }
    })

    if(calenderStartDate === '' || calenderEndDate === ''){
        filteredTripDetails = [...tripDetails.tripDetails]
    }

    return (
        <div className="trip-wsise-details">
                        {filteredTripDetails.map((trip, tripIndex) => {
                            let startDate = formattedDate(new Date(parseInt(trip.startDay)));
                            let endDate = formattedDate(new Date(parseInt(trip.endDay)));
                            let totalTripTime = getTotalTimeTrip(new Date(parseInt(trip.startDay)), new Date(parseInt(trip.endDay)));
                            let totalKms = trip.tripLists.reduce((acc, curr) => {
                                return acc + Number(curr.totalKm);
                            }, 0);
                            let amount = 0;
                            trip.tripLists.map((item) => {
                                if (item.tripExpenses.length > 0) {
                                    item.tripExpenses.map((expTrip) => {
                                        amount += expTrip.amount;
                                        return amount;
                                    });
                                }
                                return amount;
                            }, 0);

                            return (
                                <div key={trip.id + tripIndex}>
                                    <div className="trip-header">
                                        <div className="trip-item-details-complete">
                                            <div className="date-time-details">
                                                Date: {startDate} - {endDate} ({totalTripTime})
                                            </div>
                                            <div className="distance-details">
                                                <span className='blue-highlight'>Total KM: {totalKms} KM</span> <span className='yellow-highlight'>Total Expense: {amount}</span>
                                            </div>
                                            <div className="collapsable" onClick={collapseHandler}>-</div>
                                        </div>
                                        <div className='table-container'><table>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Trip Starts(Node) to Trip Ends(Node)</th>
                                                    <th>Drive Name</th>
                                                    <th>Trip Expenses</th>
                                                    <th>Trip Km</th>
                                                    <th>Trip Gps Km</th>
                                                    <th>Trip Time</th>
                                                    <th>Odometer Reading</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {trip.tripLists.map((item, index) => {
                                                    
                                                    return (
                                                        <tr key={"tripList" + index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {item.startPointNode} ({getTime(new Date(parseInt(item.startTripDate)))}){" "}
                                                                <span>&#8594;</span> {item.endPointNode} (
                                                                {getTime(new Date(parseInt(item.endTripDate)))})
                                                            </td>
                                                            <td>{item.driverName}</td>
                                                            <td>
                                                                {item.tripExpenses.length > 0
                                                                    ? <span className='tripe-expense'>Rs {item.tripExpenses.reduce((acc, curr) => {
                                                                        return acc + curr.amount;
                                                                    }, 0)} <i className='fa fa-info-circle'></i></span> 
                                                                      
                                                                    : <span className='tripe-expense'>Rs 0 <i className='fa fa-info-circle'></i></span>}
                                                            </td>
                                                            <td>{item.totalKm} km</td>
                                                            <td>{item.gpsDistance} km</td>
                                                            <td>
                                                                {getTotalTimeTrip(
                                                                    new Date(parseInt(item.startTripDate)),
                                                                    new Date(parseInt(item.endTripDate))
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item.startODOMeter > 0 ? item.startODOMeter : "N/A"} <span>&#8594;</span>{" "}
                                                                {item.endODOMeter > 0 ? item.endODOMeter : "N/A"}
                                                            </td>
                                                            <td>
                                                                <Button btnText="Movement Report" color='#01c5c4' btnClickHandler={btnClickHandler}/>
                                                                <Button btnText="Stoppage Report" color='#01c5c4' btnClickHandler={btnClickHandler} />
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
    )
}

export default TripDetails