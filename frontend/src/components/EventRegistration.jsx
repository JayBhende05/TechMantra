import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

const EventRegistration = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        class: "",
        event: "",
        type: "individual",
        participants: [""]
    });

    const [totalFee, setTotalFee] = useState(50);
    const [showPaymentButton, setShowPaymentButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paymentButtonId, setPaymentButtonId] = useState("pl_Q1Y9O40Gjo3T22");

    const paymentContainerRef = useRef(null);

    useEffect(() => {
        if (formData.type === "individual") {
            setTotalFee(50);
            setPaymentButtonId("pl_Q1Y9O40Gjo3T22");
        } else {
            setTotalFee(150);
            setPaymentButtonId("pl_Q1YQ04pF6EH0tN");
        }
    }, [formData.type]);

    useEffect(() => {
        if (!validateForm()) {
            setShowPaymentButton(false);
            return;
        }

        setLoading(true);
        setShowPaymentButton(false);

        setTimeout(() => {
            setShowPaymentButton(true);
            setLoading(false);

            if (paymentContainerRef.current) {
                paymentContainerRef.current.innerHTML = ""; // Clear previous scripts
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/payment-button.js";
                script.dataset.payment_button_id = paymentButtonId;
                script.async = true;
                paymentContainerRef.current.appendChild(script);
            }
        }, 2000);
    }, [formData, paymentButtonId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleParticipantsChange = (index, value) => {
        setFormData((prev) => {
            const updatedParticipants = [...prev.participants];
            updatedParticipants[index] = value;
            return { ...prev, participants: updatedParticipants };
        });
    };

    const addParticipant = () => {
        if (formData.participants.length < 4) {
            setFormData((prev) => ({
                ...prev,
                participants: [...prev.participants, ""]
            }));
        }
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.class || !formData.event) return false;
        if (formData.type === "group") return formData.participants.every((p) => p.trim() !== "");
        return true;
    };

    const sendRegistrationData = async ()=>{
        
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:5000/api/v1/register/registerUser', formData);
            console.log(response)
            // setMessage(response.data.message);
          } catch (error) {
            // setMessage(error.response?.data?.message || 'Something went wrong');
          }

    }

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />

                <select name="class" onChange={handleChange} required>
                    <option value="">Select Class</option>
                    <option value="UG">Undergraduate</option>
                    <option value="PG">Postgraduate</option>
                </select>

                <select name="event" onChange={handleChange} required>
                    <option value="">Select Event</option>
                    <option value="Coding-competition">Byte Battle (11th Mar)</option>
                    <option value="Lan-games">BGMI The Last DeadShot(11th Mar)</option>
                    <option value="Hackathon">Hackathon(11th Mar)</option>
                    <option value="Short-movie-making">CineCarft(11th Mar)</option>
                    <option value="CrossWord">WordWave(11th Mar)</option>
                    <option value="Tech Meme">Geek Of Meme(11th Mar)</option>
                    <option value="Photography">ShutterClash(11th Mar)</option>
                    <option value="Web-design">FrontendFiesta(12th Mar)</option>
                    <option value="Poster-competition">CanvasClash(12th Mar)</option>
                    <option value="SharkTank">Shark Tank(12th Mar)</option>
                    <option value="TBG">Team Building Game(12th Mar)</option>
                    <option value="Doodle-competition">The Doodle League(12th Mar)</option>
                    <option value="tresurer-Hunt">The Lost Treasure(12th Mar)</option>
                    <option value="Quiz">Quiz(12th Mar)</option>
                </select>

                <select name="type" onChange={handleChange} required>
                    <option value="individual">Individual (₹50)</option>
                    <option value="group">Group (₹150, max 4 participants)</option>
                </select>

                {formData.type === "group" && (
                    <div>
                        {formData.participants.map((participant, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Participant ${index + 1} Name`}
                                value={participant}
                                onChange={(e) => handleParticipantsChange(index, e.target.value)}
                                required
                            />
                        ))}
                        {formData.participants.length < 4 && (
                            <button
                                type="button"
                                onClick={addParticipant}
                                style={{ marginTop: "10px", padding: "8px", backgroundColor: "blue", color: "white" }}
                            >
                                ➕ Add Participant
                            </button>
                        )}
                    </div>
                )}

                <p>
                    <strong>Total Fee:</strong> ₹{totalFee}
                </p>

                <div ref={paymentContainerRef} onClick={sendRegistrationData}></div>
                {loading && <p style={{ color: "blue" }}>⏳ Loading Payment Gateway...</p>}
                {!showPaymentButton && !loading && (
                    <p style={{ color: "red" }}>⚠ Please fill in all required fields to proceed with payment.</p>
                )}
                <script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_Q1YQ04pF6EH0tN" async> </script>
            </form>
        </div>
    );
};

export default EventRegistration;
