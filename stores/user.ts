import { tr } from "@nuxt/ui/runtime/locale/index.js";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: null as string | null,
    roles: [] as string[],
    loading: true,
    loaded: false,
  }),
  actions: {
    async fetchUser() {
      debugger
      const res = await fetch("/api/me", { credentials: "include" });
      if (!res.ok) {
        this.username = null;
        this.roles = [];
        this.loaded = true;
        this.loading = false;
        return;
      }
      const data = await res.json();
      this.username = data.username;
      this.roles = data.roles;
      this.loaded = true;
      this.loading = false;
    },
    async logout() {
      this.loading = true;
      await fetch("/api/leave", { method: "get", credentials: "include" });
      this.username = null;
      this.roles = [];
      this.loaded = true;
      this.loading = false;
    },
  },
});
