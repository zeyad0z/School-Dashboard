import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "dashboard-default" | "dashboard-edit" | "dashboard-prod"
declare module 'nuxt/app' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}