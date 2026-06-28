import { useTripWizardStore } from "../store/tripWizardStore"
import { WizardStep } from "../types/createTrip"

export function useTripWizard() {
  const store = useTripWizardStore()

  const nextStep = () => {
    if (store.step < 5) {
      store.setStep((store.step + 1) as WizardStep)
    }
  }

  const prevStep = () => {
    if (store.step > 1) {
      store.setStep((store.step - 1) as WizardStep)
    }
  }

  return {
    ...store,
    nextStep,
    prevStep,
  }
}
