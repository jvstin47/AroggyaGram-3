import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MedicationService } from '@/services/medications/medication.service';

export const useMedicationsQuery = (patientId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['medications', patientId],
    queryFn: () => MedicationService.getMedications(patientId),
    staleTime: 1000 * 30
  });

  const addMutation = useMutation({
    mutationFn: ({ name, dosage, time }: { name: string; dosage: string; time: string }) =>
      MedicationService.addMedication(patientId, name, dosage, time),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications', patientId] });
    }
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, taken }: { id: string; taken: boolean }) =>
      MedicationService.toggleTaken(id, taken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications', patientId] });
    }
  });

  return {
    medications: query.data || [],
    isLoading: query.isLoading,
    addMedication: addMutation.mutateAsync,
    toggleTaken: toggleMutation.mutateAsync
  };
};
