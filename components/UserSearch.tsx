"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useUserSearch } from "@/hooks/useUserSearch";
import { useUser } from "@clerk/nextjs";
import {
  UserIcon,
  SearchIcon,
  XIcon,
  MailIcon
} from "lucide-react";
import Image from "next/image";
import { InlineSpinner } from "./LoadingSpinner";

export default function UserSearch({
  onSelectUser,
  placeholder = "Search users by name or email...",
  className,
}: {
  onSelectUser: (user: Doc<"users">) => void;
  placeholder?: string;
  className?: string;
}) {
  const { searchTerm, setSearchTerm, searchResults, isLoading } =
    useUserSearch();

  const { user } = useUser();

  // Filter out the current logged-in user from search results
  const filteredResults = searchResults.filter(
    (searchUser) => searchUser.userId !== user?.id
  );

  const handleSelectUser = (user: typeof searchResults[0]) => {
    onSelectUser(user);
    setSearchTerm(""); // Clear search after selection
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {searchTerm && (
          <button onClick={clearSearch} className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {searchTerm.trim() && (
        <div className="mt-2 bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              <div className="flex items-center justify-center space-x-2">
                <InlineSpinner size="sm" />
                <span>Searching...</span>
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <UserIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No users found matching &quot;{searchTerm}&quot;</p>
            </div>
          ) : (
            <div className="py-2">
              {filteredResults.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleSelectUser(user)}
                  className="w-full px-4 py-3 text-left hover:bg-accent transition-colors border-b border-border last:border-b-0 focus:outline-none focus:bg-accent"
                >
                  <div className="flex items-center space-x-3">
                    {/* User Avatar */}
                    <div className="relative">
                      <Image
                        src={user.imageUrl}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
                      />
                    </div>
                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-foreground truncate">
                          {user.name}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <MailIcon className="h-3 w-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {/* Selection Indicator */}
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}