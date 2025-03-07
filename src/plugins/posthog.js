import posthog from 'posthog-js'

export const PostHogPlugin = {
  install(app) {
    posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
      api_host: 'https://eu.i.posthog.com',
      loaded: (posthog) => {
        if (import.meta.env.DEV) {
          posthog.opt_out_capturing()
        }
      },
      capture_pageview: false, // We'll handle this manually for more control
    })

    // Make PostHog available globally in the Vue app
    app.config.globalProperties.$posthog = posthog

    // Add router tracking if you add vue-router later
    if (app.$router) {
      app.$router.afterEach((to) => {
        posthog.capture('$pageview', {
          current_url: to.fullPath,
        })
      })
    }
  },
}

// Composable for using PostHog in setup scripts
export function usePostHog() {
  return posthog
}
