import { UserButton, useUser } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChannelList } from "stream-chat-react";
import { ChannelFilters, ChannelOptions, ChannelSort } from "stream-chat";
import NewChatDialog from "./NewChatDialog";

export function AppSidebar() {
  const { user } = useUser();

  const filters: ChannelFilters = {
    members: { $in: [user?.id as string] },
    type: { $in: ["messaging", "team"] }, // Show both 1-1 chats and group chats
  };

  const sort: ChannelSort = { last_message_at: -1 };

  const options: ChannelOptions = { presence: true, state: true };

  return (
    <Sidebar variant="floating" {...(user ? {}: { isCollapsed: true })}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center justify-between w-full font-DMregular">
                <div className="flex-col ">
                  <span className="text-sm text-muted-foreground">Welcome back</span>
                  <span className="text-md font-semibold ml-1">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <UserButton signInUrl="/sign-in" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <NewChatDialog>
              <Button className="w-full" variant="outline">
                Start New Chat
              </Button>
              </NewChatDialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Channels List */}
        <SidebarMenu>
          <ChannelList
            filters={filters}
            sort={sort}
            options={options}
            EmptyStateIndicator={() => (
              <div className="flex flex-col items-center justify-center p-4">
                <h2 className="text-xl opacity-20 text-text-muted-foreground mb-2">
                  Ready to chat?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] text-center">
                  Your conversations will appear here once you start chatting with others.
                </p>
              </div>
            )}
          />
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}