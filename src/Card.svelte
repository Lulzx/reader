{#each [...Array(1).keys()] as k}
  <div
    class="mt-2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div class="md:flex">
      <div class="md:flex-shrink-0">
        <img
          class="h-48 w-full object-cover md:w-48"
          src="https://images.dog.ceo/breeds/terrier-russell/iguet5.jpeg"
          alt="Man looking at item at a store" />
      </div>
      <div class="p-8">
        <div
          class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Very wow
          {k}
        </div>
        <a
          href="#!"
          class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Want
          to have a companion in your life?</a>
        <p class="mt-2 text-gray-500">
          Let us show you the world of friendly dogs who won't betray you ever
          no matter what and stay aside you at all times.
        </p>
      </div>
    </div>
  </div>
{/each}
