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
        <div style={{
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            textAlign: "center",
            background: "#ffffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px"
        }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>Event Registration</h2>
        
            <form style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    onChange={handleChange} 
                    required 
                    style={{
                        padding: "10px", 
                        border: "1px solid #ccc", 
                        borderRadius: "5px",
                        fontSize: "16px"
                    }} 
                />
        
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    required 
                    style={{
                        padding: "10px", 
                        border: "1px solid #ccc", 
                        borderRadius: "5px",
                        fontSize: "16px"
                    }} 
                />
        
                <select 
                    name="class" 
                    onChange={handleChange} 
                    required 
                    style={{
                        padding: "10px", 
                        border: "1px solid #ccc", 
                        borderRadius: "5px",
                        fontSize: "16px",
                        backgroundColor: "#f9f9f9"
                    }}
                >
                    <option value="">Select Class</option>
                    <option value="UG">Undergraduate</option>
                    <option value="PG">Postgraduate</option>
                </select>
        
                <select 
                    name="event" 
                    onChange={handleChange} 
                    required 
                    style={{
                        padding: "10px", 
                        border: "1px solid #ccc", 
                        borderRadius: "5px",
                        fontSize: "16px",
                        backgroundColor: "#f9f9f9"
                    }}
                >
                    <option value="">Select Event</option>
                    <option value="Coding-competition">Byte Battle (11th Mar)</option>
                    <option value="Lan-games">BGMI The Last DeadShot (11th Mar)</option>
                    <option value="Hackathon">Hackathon (11th Mar)</option>
                    <option value="Short-movie-making">CineCarft (11th Mar)</option>
                    <option value="CrossWord">WordWave (11th Mar)</option>
                    <option value="Tech Meme">Geek Of Meme (11th Mar)</option>
                    <option value="Photography">ShutterClash (11th Mar)</option>
                    <option value="Web-design">FrontendFiesta (12th Mar)</option>
                    <option value="Poster-competition">CanvasClash (12th Mar)</option>
                    <option value="SharkTank">Shark Tank (12th Mar)</option>
                    <option value="TBG">Team Building Game (12th Mar)</option>
                    <option value="Doodle-competition">The Doodle League (12th Mar)</option>
                    <option value="tresurer-Hunt">The Lost Treasure (12th Mar)</option>
                    <option value="Quiz">Quiz (12th Mar)</option>
                </select>
        
                <select 
                    name="type" 
                    onChange={handleChange} 
                    required 
                    style={{
                        padding: "10px", 
                        border: "1px solid #ccc", 
                        borderRadius: "5px",
                        fontSize: "16px",
                        backgroundColor: "#f9f9f9"
                    }}
                >
                    <option value="individual">Individual (₹50)</option>
                    <option value="group">Group (₹150, max 4 participants)</option>
                </select>
        
                {formData.type === "group" && (
                    <div style={{ textAlign: "left" }}>
                        {formData.participants.map((participant, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Participant ${index + 1} Name`}
                                value={participant}
                                onChange={(e) => handleParticipantsChange(index, e.target.value)}
                                required
                                style={{
                                    padding: "8px", 
                                    marginBottom: "8px", 
                                    border: "1px solid #ccc", 
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                    width: "100%"
                                }}
                            />
                        ))}
                        {formData.participants.length < 4 && (
                            <button
                                type="button"
                                onClick={addParticipant}
                                style={{
                                    marginTop: "10px",
                                    padding: "10px",
                                    backgroundColor: "#007BFF",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                    cursor: "pointer"
                                }}
                            >
                                ➕ Add Participant
                            </button>
                        )}
                    </div>
                )}
        
                <p style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
                    Total Fee: ₹{totalFee}
                </p>
        
                <div ref={paymentContainerRef} onClick={sendRegistrationData}></div>
        
                {loading && <p style={{ color: "blue", fontSize: "14px" }}>⏳ Loading Payment Gateway...</p>}
                {!showPaymentButton && !loading && (
                    <p style={{ color: "red", fontSize: "14px" }}>⚠ Please fill in all required fields to proceed with payment.</p>
                )}
        
                <script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_Q1YQ04pF6EH0tN" async> </script>
            </form>
        </div>
        
    );
};

export default EventRegistration;
