"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import streamClient from "@/lib/stream";
import { CreateToken } from "@/actions/CreateToken";

function UserSyncWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoaded: IsUserLoaded } = useUser();
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convex mutation to sync user
  const createOrUpdateUser = useMutation(api.users.updateUser);

  const syncUser = useCallback(async () => {
    if (!user?.id) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const tokenProvider = async () => {
        if (!user?.id) {
            throw new Error("User ID is not authenticated");
        };

        const token = await CreateToken(user.id);
        return token;
      }

        // 1. Sync user to Convex
        await createOrUpdateUser({
            userId: user.id,
            name: 
            user.fullName ||
            user.firstName ||
            user.emailAddresses[0]?.emailAddress ||
            "Unknown User",
            email: user.emailAddresses[0]?.emailAddress || "",
            imageUrl: user.imageUrl || "",
          });

        // 2. Connect user to Stream
        await streamClient.connectUser(
            {
                id: user.id,
                name:
                user.fullName ||
                user.firstName ||
                user.emailAddresses[0]?.emailAddress ||
                "Unknown User",
                image: user.imageUrl || "",
            }, tokenProvider);

    } catch (err) {
      console.error("Failed to sync user", err);
      setError(
        err instanceof Error ? err.message : "Failed to sync user"
      );
    } finally {
      setIsLoading(false);
    }
  }, [createOrUpdateUser, user]);

  const disconnectUser = useCallback(async () => {
    try {
      await streamClient.disconnectUser();
    } catch (err) {
      console.error("Failed to disconnect user", err);
    }
  }, []);

  useEffect(() => {
    if (!IsUserLoaded) return;

    if (user) {
      syncUser();
    } else {
      disconnectUser();
      setIsLoading(false);
    }

    // Cleanup function
    return () => {
      if (user) {
        disconnectUser();
      }
    };
  }, [user, IsUserLoaded, syncUser, disconnectUser]);

   if (!IsUserLoaded || isloading) {
    return (
      <LoadingSpinner
        size="lg"
        message={!IsUserLoaded ? "Loading..." : "Syncing user data..."}
        className="min-h-screen"
      />
    );
  }

  if (error) {
    return (
      <div className="flex-1 items-center justify-center bg-white px-6">
        <p className="text-red-500 text-lg font-semibold mb-2">Sync Error</p>
        <p className="text-gray-600 text-center mb-4">
          Error
        </p>
        <p className="text-gray-500 text-center text-sm">
          Please try restarting the app or contact support if the issue
          persists.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

export default UserSyncWrapper;