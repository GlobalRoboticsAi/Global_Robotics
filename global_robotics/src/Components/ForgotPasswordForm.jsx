import React, { useState } from 'react';
import '../Styles/ForgotPasswordForm.css';
import Base_URL from '../Config';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSendOTP = async () => {
    if (!email) return setError("Please enter your email.");
    setError(""); setMessage(""); setIsLoading(true);
    const res = await fetch(`${Base_URL}auth/send-otp?email=${email}`, { method: "POST" });
    const msg = await res.text();
    setIsLoading(false);
    if (msg.includes("OTP sent")) {
      setStep(2);
      setMessage("OTP sent to your email.");
    } else {
      setError(msg);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) return setError("Please enter the OTP.");
    setError(""); setMessage(""); setIsLoading(true);
    const res = await fetch(`${Base_URL}auth/verify-otp?email=${email}&otp=${otp}`, { method: "POST" });
    const msg = await res.text();
    setIsLoading(false);
    if (msg.includes("verified")) {
      setStep(3);
      setMessage("OTP verified. Enter new password.");
    } else {
      setError(msg);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) return setError("Password must be at least 6 characters.");
    setError(""); setMessage(""); setIsLoading(true);
    const res = await fetch(`${Base_URL}auth/reset-password?email=${email}&newPassword=${newPassword}`, { method: "POST" });
    const msg = await res.text();
    setIsLoading(false);
    if (msg.includes("updated")) {
      setMessage("Password updated successfully. Redirecting to login...");
      setTimeout(() => window.location.href = "/login", 2000);
    } else {
      setError(msg);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Forgot Password</h2>

        {step === 1 && (
          <>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
            <button onClick={handleSendOTP} disabled={isLoading}>
              {isLoading ? <span className="loader"></span> : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label>OTP</label>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter the OTP" />
            <button onClick={handleVerifyOTP} disabled={isLoading}>
              {isLoading ? <span className="loader"></span> : "Verify OTP"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <label>New Password</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" />
            <button onClick={handleResetPassword} disabled={isLoading}>
              {isLoading ? <span className="loader"></span> : "Reset Password"}
            </button>
          </>
        )}

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
