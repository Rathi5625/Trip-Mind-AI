import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "@/services/apiClient"
import { ItineraryDay as TripDayDto, Activity as ActivityDto } from "../types/workspace"

export function useItineraryQuery(tripId: string) {
  return useQuery<TripDayDto[]>({
    queryKey: ["itinerary", tripId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/trips/${tripId}/itinerary`)
      return response.data
    },
    enabled: !!tripId
  })
}

export function useAddActivityMutation(tripId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (dto: Partial<ActivityDto>) => {
      const response = await axiosInstance.post(`/api/trips/${tripId}/activities`, dto)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itinerary", tripId] })
      queryClient.invalidateQueries({ queryKey: ["workspaceTimeline", tripId] })
    }
  })
}

export function useUpdateActivityMutation(tripId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ activityId, dto }: { activityId: number; dto: Partial<ActivityDto> }) => {
      const response = await axiosInstance.put(`/api/activities/${activityId}`, dto)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itinerary", tripId] })
      queryClient.invalidateQueries({ queryKey: ["workspaceTimeline", tripId] })
    }
  })
}

export function useDeleteActivityMutation(tripId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (activityId: number) => {
      const response = await axiosInstance.delete(`/api/activities/${activityId}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itinerary", tripId] })
      queryClient.invalidateQueries({ queryKey: ["workspaceTimeline", tripId] })
    }
  })
}

export function useOptimizeMutation(tripId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(`/api/trips/${tripId}/optimize`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itinerary", tripId] })
      queryClient.invalidateQueries({ queryKey: ["weather", tripId] })
      queryClient.invalidateQueries({ queryKey: ["crowds", tripId] })
      queryClient.invalidateQueries({ queryKey: ["budget", tripId] })
    }
  })
}

export function useAskAiMutation(tripId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (command: string) => {
      const response = await axiosInstance.post(`/api/trips/${tripId}/ask-ai`, { command })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itinerary", tripId] })
    }
  })
}

export function useWeatherQuery(tripId: string) {
  return useQuery({
    queryKey: ["weather", tripId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/trips/${tripId}/weather`)
      return response.data
    },
    enabled: !!tripId
  })
}

export function useCrowdsQuery(tripId: string) {
  return useQuery({
    queryKey: ["crowds", tripId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/trips/${tripId}/crowds`)
      return response.data
    },
    enabled: !!tripId
  })
}

export function useBudgetQuery(tripId: string) {
  return useQuery({
    queryKey: ["budget", tripId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/trips/${tripId}/budget`)
      return response.data
    },
    enabled: !!tripId
  })
}

export function useTransportQuery(tripId: string) {
  return useQuery({
    queryKey: ["transport", tripId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/trips/${tripId}/transport`)
      return response.data
    },
    enabled: !!tripId
  })
}
