import React from 'react'

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Forgot Password</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  )
}

