"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { usePermission } from "@/hooks/use-permission"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface RouteGuardProps {
  children: ReactNode
  permission?: string
  permissions?: string[]
  requireAll?: boolean
  redirectTo?: string
  showForbidden?: boolean
}

export function RouteGuard({
  children,
  permission,
  permissions = [],
  requireAll = false,
  redirectTo = "/",
  showForbidden = true,
}: RouteGuardProps) {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/account/login")
      return
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  let hasAccess = false

  if (permission) {
    hasAccess = hasPermission(permission)
  } else if (permissions.length > 0) {
    hasAccess = requireAll ? hasAllPermissions(permissions) : hasAnyPermission(permissions)
  } else {
    hasAccess = true
  }

  if (!hasAccess) {
    if (showForbidden) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold">访问被拒绝</h2>
                <p className="text-muted-foreground">您没有访问此页面的权限</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    } else {
      router.push(redirectTo)
      return null
    }
  }

  return <>{children}</>
}
