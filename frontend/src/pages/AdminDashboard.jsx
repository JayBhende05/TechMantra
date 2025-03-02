import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin-login');
            return;
        }
        axios.get('http://localhost:5000/api/admin/registrations', {
            headers: { Authorization: token }
        }).then(res => setRegistrations(res.data));
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Event</th>
                        <th>Token</th>
                        <th>Participants</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.map(reg => (
                        <tr key={reg.token}>
                            <td>{reg.name}</td>
                            <td>{reg.email}</td>
                            <td>{reg.event}</td>
                            <td>{reg.token}</td>
                            <td>{reg.participants ? reg.participants.join(', ') : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminDashboard;