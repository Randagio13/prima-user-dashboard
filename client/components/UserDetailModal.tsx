import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import type { User } from "@shared/api"
import { Badge } from "./ui/Badge"
import { Button } from "./ui/button"

interface UserDetailModalProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
}

export function UserDetailModal({
  user,
  isOpen,
  onClose,
}: UserDetailModalProps) {
  if (!user) return null

  const roleColors = {
    Admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Editor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Viewer: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  }

  const statusColors = {
    Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-indigo-800 dark:outline dark:-outline-offset-1 dark:outline-white/10 dark:text-gray-300"
            >
              <div className="space-y-6">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-24 h-24 rounded-full mb-4 border-4 border-primary/20"
                  />
                  <h2 className="text-2xl font-bold text-foreground">
                    {user.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {user.email}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between p-3 bg-accent/50">
                    <span className="text-sm font-medium text-muted-foreground">
                      Role
                    </span>
                    <Badge
                      className={`text-xs rounded-md p-1 ${roleColors[user.role]}`}
                    >
                      {user.role}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border-t border-gray-300 dark:border-white/10 bg-accent/50">
                    <span className="text-sm font-medium text-muted-foreground">
                      Status
                    </span>
                    <Badge
                      className={`text-xs rounded-md p-1 ${statusColors[user.status]}`}
                    >
                      {user.status}
                    </Badge>
                  </div>

                  <div className="p-3 bg-accent/50 border-t border-gray-300 dark:border-white/10">
                    <span className="text-sm font-medium text-muted-foreground">
                      Email
                    </span>
                    <p className="text-sm text-foreground mt-1 break-all">
                      {user.email}
                    </p>
                  </div>

                  <div className="p-3 border-t border-gray-300 dark:border-white/10 bg-accent/50">
                    <span className="text-sm font-medium text-muted-foreground">
                      User ID
                    </span>
                    <p className="text-sm text-foreground mt-1 font-mono">
                      {user.id}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <Button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                  Go back to dashboard
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
