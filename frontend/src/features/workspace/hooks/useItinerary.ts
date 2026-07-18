import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/services/apiClient"
import { API_ENDPOINTS } from "@/constants/endpoints"
import { ItineraryDay as TripDayDto, Activity as ActivityDto } from "../types/workspace"

export function useItineraryQuery(tripId: string) {
  return useQuery<TripDayDto[]>({
    queryKey: ["itinerary", tripId],
    queryFn: () => apiClient.get(API_ENDPOINTS.TRIPS.ITINERARY(tripId)),
    enabled: !!tripId
  })
}

export function useAddActivityMutation(tripId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: Partial<ActivityDto>) => apiClient.post(`/api/trips/${tripId}/activities`, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itinerary", tripId] })
      queryClient.invalidateQueries({ queryKey: ["workspaceTimeline", tripId] })
    }
  })
}

export function useUpdateActivityMutation(tripId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ activityId, dto }: { activityId: number; dto: Partial<ActivityDto> }) => apiClient.put(`/api/activities/${activityId}`, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itinerary", tripId] })
      queryClient.invalidateQueries({ queryKey: ["workspaceTimeline", tripId] })
    }
  })
}

export function useDeleteActivityMutation(tripId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (activityId: number) => apiClient.delete(`/api/activities/${activityId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itinerary", tripId] })
      queryClient.invalidateQueries({ queryKey: ["workspaceTimeline", tripId] })
    }
  })
}

export function useOptimizeMutation(tripId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => apiClient.post(`/api/trips/${tripId}/optimize`),
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
    mutationFn: (command: string) => apiClient.post<any>(`/api/trips/${tripId}/ask-ai`, { command }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itinerary", tripId] })
    }
  })
}

export function useWeatherQuery(tripId: string) {
  return useQuery<any>({
    queryKey: ["weather", tripId],
    queryFn: () => apiClient.get<any>(`/api/trips/${tripId}/weather`),
    enabled: !!tripId
  })
}

export function useCrowdsQuery(tripId: string) {
  return useQuery<any>({
    queryKey: ["crowds", tripId],
    queryFn: () => apiClient.get<any>(`/api/trips/${tripId}/crowds`),
    enabled: !!tripId
  })
}

export function useBudgetQuery(tripId: string) {
  return useQuery<any>({
    queryKey: ["budget", tripId],
    queryFn: () => apiClient.get<any>(`/api/trips/${tripId}/budget`),
    enabled: !!tripId
  })
}

export function useTransportQuery(tripId: string) {
  return useQuery<any>({
    queryKey: ["transport", tripId],
    queryFn: () => apiClient.get<any>(`/api/trips/${tripId}/transport`),
    enabled: !!tripId
  })
}
