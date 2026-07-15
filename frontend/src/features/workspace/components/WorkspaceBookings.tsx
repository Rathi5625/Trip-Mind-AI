"use client"

import * as React from "react"
import { Plane, Hotel, Train, Calendar, ClipboardCheck, AlertCircle } from "lucide-react"
import { Booking } from "../types/workspace"

interface WorkspaceBookingsProps {
  bookings: Booking[]
}

export function WorkspaceBookings({ bookings }: WorkspaceBookingsProps) {
  const getBookingIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case "FLIGHT":
        return <Plane className="size-5 text-blue-500" />
      case "HOTEL":
        return <Hotel className="size-5 text-emerald-500" />
      default:
        return <Train className="size-5 text-violet-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <ClipboardCheck className="size-3" />
            CONFIRMED
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <AlertCircle className="size-3" />
            {status}
          </span>
        )
    }
  }

  const formatDateTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      })
    } catch (e) {
      return dateStr
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
          Bookings & Reservations
        </h2>
        <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 mt-0.5">
          Review, check reference codes, and upload visa/tickets directly to bookings.
        </p>
      </div>

      <div className="space-y-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition-all"
          >
            {/* Left side: Icon & Title */}
            <div className="flex items-center gap-4">
              <div className="size-11 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-black/5 dark:border-white/5 flex items-center justify-center shrink-0 shadow-sm">
                {getBookingIcon(booking.resourceType)}
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  {booking.resourceType}
                </h4>
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-150 mt-0.5">
                  {booking.resourceName}
                </h3>
                <span className="text-[10px] font-bold text-slate-400 block mt-1">
                  Code: <span className="text-slate-600 dark:text-slate-300 font-mono">{booking.referenceNumber}</span>
                </span>
              </div>
            </div>

            {/* Mid: Dates & Price */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-500 dark:text-slate-400">
              {booking.startTime && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-4 text-slate-450" />
                  <span>{formatDateTime(booking.startTime)}</span>
                </div>
              )}
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                  Amount Paid
                </span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100 mt-0.5">
                  ${booking.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Right: Status */}
            <div>{getStatusBadge(booking.status)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
