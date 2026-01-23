import { useMutation } from "@apollo/client/react";
import { UPDATE_MY_PROFILE } from "@/shared/api/mutations/auth";
import { ME } from "@/shared/api/queries/auth";
import type {
  UpdateMyProfileInput,
  UserProfileEntity,
} from "@/shared/api/generated/graphql";

export function useUpdateProfile() {
  const [updateProfile, { loading, error }] = useMutation<{
    updateMyProfile: UserProfileEntity;
  }>(UPDATE_MY_PROFILE, {
    refetchQueries: [
      {
        query: ME,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleUpdate = async (input: UpdateMyProfileInput) => {
    try {
      const result = await updateProfile({ variables: { input } });
      return result.data?.updateMyProfile;
    } catch (error) {
      throw error;
    }
  };

  return {
    updateProfile: handleUpdate,
    loading,
    error,
  };
}
