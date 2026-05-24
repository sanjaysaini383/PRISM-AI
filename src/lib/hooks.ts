'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchUser,
  fetchRepositories,
  fetchPullRequests,
  fetchPullRequest,
  fetchDashboardStats,
  fetchReviewResults,
  startReview,
  AuthRequiredError,
} from './api-client'

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false,
  })
}

export function useRepositories() {
  return useQuery({
    queryKey: ['repos'],
    queryFn: fetchRepositories,
    retry: false,
  })
}

export function usePullRequests(
  owner: string,
  repo: string,
  state: 'open' | 'closed' | 'all' = 'open'
) {
  return useQuery({
    queryKey: ['pulls', owner, repo, state],
    queryFn: () => fetchPullRequests(owner, repo, state),
    enabled: Boolean(owner && repo),
    retry: false,
  })
}

export function usePullRequest(owner: string, repo: string, prNumber: number) {
  return useQuery({
    queryKey: ['pull', owner, repo, prNumber],
    queryFn: () => fetchPullRequest(owner, repo, prNumber),
    enabled: Boolean(owner && repo && prNumber),
    retry: false,
  })
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    retry: false,
  })
}

export function useReviewResults(owner: string, repo: string, prNumber: number) {
  return useQuery({
    queryKey: ['review-results', owner, repo, prNumber],
    queryFn: () => fetchReviewResults(owner, repo, prNumber),
    enabled: Boolean(owner && repo && prNumber),
    retry: false,
  })
}

export function useStartReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      owner,
      repo,
      prNumber,
    }: {
      owner: string
      repo: string
      prNumber: number
    }) => startReview(owner, repo, prNumber),
    onSuccess: (_, { owner, repo, prNumber }) => {
      queryClient.invalidateQueries({
        queryKey: ['review-results', owner, repo, prNumber],
      })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
    },
  })
}

export { AuthRequiredError }
