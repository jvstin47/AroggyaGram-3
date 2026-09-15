import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RequestService } from '@/services/requests/request.service';
import type { RequestItem, RequestStatus } from '@/types/database.types';

export const useRequestsQuery = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['requests'],
    queryFn: () => RequestService.getRequests(),
    staleTime: 1000 * 30
  });

  const createMutation = useMutation({
    mutationFn: (payload: Omit<RequestItem, 'id' | 'created_at' | 'updated_at'>) =>
      RequestService.createRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, volunteerId }: { id: string; status: RequestStatus; volunteerId?: string | null }) =>
      RequestService.updateStatus(id, status, volunteerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    }
  });

  return {
    requests: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    createRequest: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateStatus: updateStatusMutation.mutateAsync,
    isUpdating: updateStatusMutation.isPending
  };
};
