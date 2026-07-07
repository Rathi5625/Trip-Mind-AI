import ResetPasswordPage from "@/features/auth/ResetPasswordPage"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-400">
        <div className="size-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mr-2" />
        <span className="text-xs uppercase tracking-wider font-black">Loading...</span>
      </div>
    }>
      <ResetPasswordPage />
    </Suspense>
  )
}
