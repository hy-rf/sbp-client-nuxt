import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    roles: [] as string[],
    loaded: false,
  }),
  actions: {
    async fetchUser() {
      const res = await fetch("/api/me", { credentials: "include" });
      if (!res.ok) {
        this.username = "";
        this.roles = [];
        this.loaded = false;
        return;
      }
      const data = await res.json();
      this.username = data.username;
      this.roles = data.roles;
      this.loaded = true;
    },
    logout() {
      this.username = "";
      this.roles = [];
      this.loaded = false;
      document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";
  document.cookie = "refresh=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";
    },
  },
});
