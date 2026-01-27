import React from 'react'
import BookingCard from '../bookingCard'
import { CardContent } from '../card'

export const Loader = () => {
  return (
    <BookingCard>
      <CardContent className="max-w-fit mx-auto justify-center items-center px-0 md:px-2">
        <div className="loadingspinner">
            <div id="square1"></div>
            <div id="square2"></div>
            <div id="square3"></div>
            <div id="square4"></div>
            <div id="square5"></div>
        </div>
      </CardContent>
    </BookingCard>
  )
}
