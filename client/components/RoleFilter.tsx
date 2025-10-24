import { Badge } from "./ui/Badge"

const ROLES = ["All", "Admin", "Editor", "Viewer"] as const

interface RoleFilterProps {
  value: string
  onChange: (role: string) => void
}

export function RoleFilter({ onChange, value }: RoleFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ROLES.map((role) => (
        <Badge
          key={role}
          onClick={() => onChange(role === "All" ? "" : role)}
          opacity={role === "All" && value === "" ? false : value !== role}
        >
          {role}
        </Badge>
      ))}
    </div>
  )
}
