export const Blocks = [
    {
        id: 'section', // id is mandatory
        label: 'Section', // You can use HTML/SVG inside labels
        category: 'Basic',
        attributes: { class: 'gjs-block-section' },
        content: `<section>
                    <h1 class="text-3xl font-bold underline">This is a simple title</h1>
                    <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                  </section>`,
      },
      {
        id: 'text',
        label: 'Text',
        category: 'Basic',
        content: '<div data-gjs-type="text">Insert your text here</div>',
      },
      {
        id: 'image',
        label: 'Image',
        category: 'Basic',
        // Düştüğünde bileşeni seçin
        select: true,
        // Bileşenleri basit bir HTML dizesi yerine JSON olarak iletebilirsiniz, bu durumda tanımlı bir bileşen türü olan "image" de kullanırız.
        content: { type: 'image' },
        // Bu, bırakılan bileşenlerde "active" olayını tetikler ve "image", AssetManager'ı açarak tepki verir.
        activate: true,
      },
      {
        id: 'link',
        label: 'Link',
        category: 'Basic',
        activate: true,
        content: {
          type: 'link',
          content: 'Insert your link here',
          style: { color: '#d983a6' }
        }
      },
      {
        id: 'pricing',
        label: 'Pricing',
        category: 'Extra',
        // attributes: { class: '' },
        content: `
          <div class="bg-white py-24 sm:py-32">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
              <div class="mx-auto max-w-2xl sm:text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
                <p class="mt-6 text-lg leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p>
              </div>
              <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div class="p-8 sm:p-10 lg:flex-auto">
                  <h3 class="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
                  <p class="mt-6 text-base leading-7 text-gray-600">Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p>
                  <div class="mt-10 flex items-center gap-x-4">
                    <h4 class="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                    <div class="h-px flex-auto bg-gray-100"></div>
                  </div>
                  <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                    <li class="flex gap-x-3">
                      <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Private forum access
                    </li>
                    <li class="flex gap-x-3">
                      <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Member resources
                    </li>
                    <li class="flex gap-x-3">
                      <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Entry to annual conference
                    </li>
                    <li class="flex gap-x-3">
                      <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Official member t-shirt
                    </li>
                  </ul>
                </div>
                <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                  <div class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div class="mx-auto max-w-xs px-8">
                      <p class="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                      <p class="mt-6 flex items-baseline justify-center gap-x-2">
                        <span class="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                        <span class="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                      </p>
                      <a href="#" class="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get access</a>
                      <p class="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'team-sections',
        label: 'Team Sections',
        category: 'Extra',
        content: `
          <div class="bg-white py-24 sm:py-32">
            <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
              <div class="max-w-2xl">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
                <p class="mt-6 text-lg leading-8 text-gray-600">Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper suspendisse.</p>
              </div>
              <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                <li>
                  <div class="flex items-center gap-x-6">
                    <img class="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                    <div>
                      <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">Leslie Alexander</h3>
                      <p class="text-sm font-semibold leading-6 text-indigo-600">Co-Founder / CEO</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        `
      },
      {
        id: 'products',
        label: 'Products',
        category: 'Extra',
        content: `
          <div class="bg-white">
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 class="sr-only">Products</h2>
          
              <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <a href="#" class="group">
                  <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75">
                  </div>
                  <h3 class="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
                  <p class="mt-1 text-lg font-medium text-gray-900">$48</p>
                </a>
          
                <!-- More products... -->
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'gallery',
        label: 'Gallery',
        category: 'Extra',
        content: `
          <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" alt="Two each of gray, white, and black shirts laying flat." class="h-full w-full object-cover object-center">
            </div>
            <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg" alt="Model wearing plain black basic tee." class="h-full w-full object-cover object-center">
              </div>
              <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg" alt="Model wearing plain gray basic tee." class="h-full w-full object-cover object-center">
              </div>
            </div>
            <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg" alt="Model wearing plain white basic tee." class="h-full w-full object-cover object-center">
            </div>
          </div>
        `
      }
];