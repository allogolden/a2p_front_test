import { inject } from 'vue'
export function useSidebar(){
  const open = inject('sidebarOpen') as any
  const setOpen = inject('setSidebarOpen') as ((v:boolean)=>void)|undefined
  const toggleSidebar = inject('toggleSidebar') as (()=>void)|undefined
  const isMobile = inject('sidebarIsMobile') as boolean | undefined
  return { open, setOpen, toggleSidebar, isMobile: isMobile ?? false }
}
