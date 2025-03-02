import React, { useEffect, useState } from "react";
import axios from "../api/api";

const Admin = () => {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        axios.get("/registrations")
            .then((res) => setRegistrations(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Event</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.map((reg, index) => (
                        <tr key={index}>
                            <td>{reg.name}</td>
                            <td>{reg.email}</td>
                            <td>{reg.class}</td>
                            <td>{reg.event}</td>
                            <td>{reg.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
