import * as React from "react"

// import { SearchForm } from "@/components/search-form"
// import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Navigation",
      url: "#",
      items: [
        {
          title: "All Section",
          url: "/allsections",
        },
        {
          title: "Borrow a Book",
          url: "/borrow",
        },
        {
          title: "Borrowed Books",
          url: "/borrowed",
        },
        {
          title: "Admin",
          url: "/admin",
        },
      ],
    }
  ]
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar {...props}>
      <SidebarHeader class='p-5 font-bold text-3xl flex gap-1'>
        MFI Library <img src="src/MFI_LOGO.png" alt="MFI Logo" className="w-20"/>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}
