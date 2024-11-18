"use client";
import { useEffect, useState } from "react";
import React from 'react'

export default function Test() {
    const [message, setMessage] = useState("");

    useEffect(() => {
      const fetchMessage = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`);
          const data = await res.json();
          setMessage(data.message);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchMessage();
    }, []);
    return (
        <div className="container">
        <h1>Server Message:</h1>
        <p>{message || "Loading..."}</p>
      </div>
  );
}
