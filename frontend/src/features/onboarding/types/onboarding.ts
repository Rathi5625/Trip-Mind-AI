export interface OnboardingStep {
  id: number
  title: string
  subtitle?: string
  description: string
}

export interface OnboardingState {
  currentStep: number
  totalSteps: number
}
