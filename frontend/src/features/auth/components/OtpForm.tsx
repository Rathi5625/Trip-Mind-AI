"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { cn } from "@/lib/utils"
import { OtpInput } from "./OtpInput"
import { OtpTimer } from "./OtpTimer"
import { ResendCode } from "./ResendCode"
import Link from "next/link"
import { authService } from "@/services/auth.service"

const schema = z.object({
  code: z
    .array(z.string())
    .refine((val) => val.every((char) => /^\d$/.test(char)), {
      message: "Please enter a valid digit in each field",
    })
    .refine((val) => val.filter(Boolean).length === 6, {
      message: "Please fill in all 6 digits",
    }),
})

type FormData = z.infer<typeof schema>

export function OtpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "signup"
  
  const [timerSeconds, setTimerSeconds] = React.useState(60)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [submitError, setSubmitError] = React.useState("")

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: Array(6).fill(""),
    },
  })

  // Timer countdown hook
  React.useEffect(() => {
    if (timerSeconds <= 0) return
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timerSeconds])

  const handleResend = () => {
    setTimerSeconds(60)
    setSubmitError("")
    toast.success("Verification code resent!")
  }

  const onSubmit = async (data: FormData) => {
    setSubmitError("")
    
    try {
      const pin = data.code.join("")
      await authService.verifyOtp(pin)
      
      setIsSuccess(true)

      // Redirect after success animation
      setTimeout(() => {
        if (source === "forgot-password") {
          router.push("/reset-password")
        } else {
          router.push("/onboarding")
        }
      }, 1500)
    } catch (err: any) {
      setSubmitError(err.message || "Invalid verification code.")
    }
  }

  const isForgot = source === "forgot-password"
  const backText = isForgot ? "Back To Login" : "Back To Signup"
  const backLink = isForgot ? "/login" : "/signup"

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full flex flex-col items-center justify-center text-center p-4"
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mb-4">
          <CheckCircle2 className="size-8 animate-pulse" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Code Verified
        </h2>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Secure verification complete. Redirecting you to the next step...
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col font-sans text-sm">
      {/* Submit Error */}
      {submitError && (
        <div className="p-3 text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/20 dark:text-rose-400 rounded-xl border border-rose-100 dark:border-rose-950/40 mb-2">
          {submitError}
        </div>
      )}

      {/* Controlled Input fields */}
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <OtpInput
            value={field.value}
            onChange={field.onChange}
            disabled={isSubmitting}
          />
        )}
      />

      {errors.code && (
        <p className="text-[10px] font-semibold text-rose-500 pl-1 text-center -mt-3 mb-3">
          {errors.code.message}
        </p>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-blue text-white font-semibold shadow-lg shadow-blue-500/20 dark:shadow-none hover:shadow-blue-500/30 transition-all cursor-pointer disabled:opacity-50",
          isSubmitting && "pointer-events-none"
        )}
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            <span>Verify Code</span>
            <ArrowRight className="size-4 ml-1" />
          </>
        )}
      </motion.button>

      {/* Timer Display */}
      <OtpTimer seconds={timerSeconds} />

      {/* Divider */}
      <div className="border-t border-slate-100 dark:border-slate-800/60 my-5" />

      {/* Resend Action */}
      <ResendCode disabled={timerSeconds > 0} onResend={handleResend} />

      {/* Back navigation */}
      <div className="flex items-center justify-center mt-6">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary-blue dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>{backText}</span>
        </Link>
      </div>
    </form>
  )
}
