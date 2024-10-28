// UNDONE:
// DO NOT SHIP ME - TESTING EMAIL API RESPONSE

import { useState } from 'react'; 
import axios from "axios";

export default function EmailForm() {
    const [to, setTo] = useState("");  
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`${to} ${subject} ${message}`)
        try {
            await axios.post("/api/send", {
                from: "Sunstop Verify sunstopverify@gmail.com",  
                to,
                subject,
                message
            });
            alert("Email sent!");
        } catch(err) {
            alert(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input 
            type="email"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}  
        />
        <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}  
        />
        <textarea 
            rows="3"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}  
        ></textarea>
        <button type="submit">Send Email</button>
        </form>
    )
}