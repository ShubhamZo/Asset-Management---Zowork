import React from 'react'
import axios from 'axios'

export default function AssetHistoryTab({ history }) {
    return (
        <div>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Employee</th>
                        <th>Assigned Date</th>
                        <th>Return Date</th>
                        <th>Return Condition</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.length > 0 ? (
                            history.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.employeeName}</td>
                                    <td>{item.assignedDate?.split('T')[0]}</td>
                                    <td>
                                        {
                                            item.returnDate
                                                ? item.returnDate.split('T')[0]
                                                : 'Not Returned'
                                        }
                                    </td>
                                    <td> {item.returnCondition || '-'} </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center" > No assignment history found </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
