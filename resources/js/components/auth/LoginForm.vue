<template>
  <div class="flex justify-center items-center">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="text-3xl">Sign in</h2>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="mb-4">
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="username"
              autocomplete="username"
              required
              class="bg-hydra-cinder-800 appearance-none relative block w-full px-3 py-2 placeholder-gray-200 text-gray-200 rounded-md focus:z-10"
              placeholder="Username"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="bg-hydra-cinder-800 appearance-none relative block w-full px-3 py-2 placeholder-gray-200 text-gray-200 rounded-md focus:z-10"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember_me" class="ml-2 block text-sm text-white">
              Remember me
            </label>
          </div>
        </div>
        <div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
};
</script>
