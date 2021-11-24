import React from "react"
import Helmet from "react-helmet"

export const Layout = ({ children }) => {
  return (
    <div className="bg-gray-900 h-screen relative">
      <Helmet title="Booking Website"></Helmet>
      <div className="relative px-20">{children}</div>
    </div>
  )
}
