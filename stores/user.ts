import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    roles: [] as string[],
    loaded: false,
  }),
  actions: {
    async fetchUser() {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        this.username = data.username;
        this.roles = data.roles;
        this.loaded = true;
      } catch (e) {
        this.username = "";
        this.roles = [];
        this.loaded = false;
      }
    },
    logout() {
      this.username = "";
      this.roles = [];
      this.loaded = false;
    },
  },
});
