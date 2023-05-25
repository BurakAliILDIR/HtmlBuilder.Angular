import { AfterContentInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import grapesjs from 'grapesjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../_models/page.model';

@Component({
  selector: 'app-web-builder',
  templateUrl: './web-builder.component.html',
  styleUrls: ['./web-builder.component.css']
})
export class WebBuilderComponent implements OnInit {

  public editor: any = null

  page: Page;

  constructor(private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {

    this.initGrapesJS();

    await this.activatedRoute.data?.subscribe(({ findPage }) => {
      this.page = findPage.data
      console.log(this.page);
      // const element = document.getElementById('deneme');
      // element.innerText = this.page.html;
    });

  }

  initGrapesJS() {
    this.editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Avoid any default panel
      layerManager: {
        appendTo: '.layers-container',
        sortable: false,
        hidable: false,
      },
      deviceManager: {
        devices: [{
          name: 'Desktop',
          width: '', // default size
        }, {
          name: 'Mobile',
          width: '380px', // this value will be used on canvas width
          widthMedia: '480px', // this value will be used in CSS @media
        }]
      },
      storageManager: {
        type: 'local', // Type of the storage, available: 'local' | 'remote'
        autosave: true, // Store data automatically
        autoload: false, // Autoload stored data on init
        stepsBeforeSave: 1, // Otomatik kaydetme etkinse, saklama yöntemi tetiklenmeden önce kaç değişikliğin gerekli olduğunu gösterir
        options: {
          local: { // Options for the `local` type
            key: 'gjsProject', // The key for the local storage
          }
        }
      },
      // We define a default panel as a sidebar to contain layers
      panels: {
        defaults: [
          {
            id: 'layers',
            el: '.panel__right',
            // Make the panel resizable
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: 0, // Top handler
              cl: 1, // Left handler
              cr: 0, // Right handler
              bc: 0, // Bottom handler
              // Being a flex child we need to change `flex-basis` property
              // instead of the `width` (default)
              keyWidth: 'flex-basis',
            },
          },
          {
            id: 'panel-switcher',
            el: '.panel__switcher',
            buttons: [
              {
                id: 'show-layers',
                active: true,
                label: 'Layers',
                command: 'show-layers',
                // Etkinleştirildiğinde, kapatma olasılığını devre dışı bırakın
                togglable: false,
              },
              {
                id: 'show-style',
                active: true,
                label: 'Styles',
                command: 'show-styles',
                togglable: false,
              },
              {
                id: 'show-traits',
                active: true,
                label: 'Traits',
                command: 'show-traits',
                togglable: false,
              },
              {
                id: 'save',
                active: true,
                label: 'Save',
                command: 'save',
                togglable: false,
              }
            ],
          },
          {
            id: 'panel-devices',
            el: '.panel__devices',
            buttons: [{
              id: 'device-desktop',
              label: 'Desktop',
              command: 'set-device-desktop',
              active: true,
              togglable: false,
            }, {
              id: 'device-mobile',
              label: 'Mobile',
              command: 'set-device-mobile',
              togglable: false,
            }],
          }
        ]
      },
      traitManager: {
        appendTo: '.traits-container',
      },
      // The Selector Manager allows to assign classes and
      // different states (eg. :hover) on components.
      // Generally, it's used in conjunction with Style Manager
      // but it's not mandatory
      selectorManager: {
        appendTo: '.styles-container'
      },
      styleManager: {
        appendTo: '.styles-container',
        sectors: [
          {
            name: 'Dimension',
            open: false,
            // Use built-in properties
            buildProps: ['width', 'min-height', 'padding'],
            // Use `properties` to define/override single property
            properties: [
              {
                // Type of the input,
                // options: integer | radio | select | color | slider | file | composite | stack
                type: 'integer',
                name: 'The width', // Label for the property
                property: 'width', // CSS property (if buildProps contains it will be extended)
                units: ['px', '%'], // Units, available only for 'integer' types
                defaults: 'auto', // Default value
                min: 0, // Min value, available only for 'integer' types
              }
            ]
          },
          {
            name: 'Extra',
            open: false,
            buildProps: ['background-color', 'box-shadow', 'custom-prop'],
            properties: [
              {
                id: 'custom-prop',
                name: 'Custom Label',
                property: 'font-size',
                type: 'select',
                defaults: '32px',
                // List of options, available only for 'select' and 'radio'  types
                options: [
                  { value: '12px', name: 'Tiny' },
                  { value: '18px', name: 'Medium' },
                  { value: '32px', name: 'Big' },
                ],
              }
            ]
          }
        ],
      },
      blockManager: {
        appendTo: '#blocks',
        blocks: [
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
          }
        ]
      },
      assetManager: {
        assets: [
          'https://pbs.twimg.com/profile_images/744941502678339584/Dg8cykY0_400x400.jpg',
          'https://thumbs.gfycat.com/LastOrganicHuman-mobile.jpg',
        ],
      },
      canvas: {
        styles: [],
        scripts: [
          'https://cdn.tailwindcss.com'
        ]
      },
      i18n: {
        // locale: 'en', // default locale
        // detectLocale: true, // by default, the editor will detect the language
        // localeFallback: 'en', // default fallback
        // messages: { tr },
      },
    });

    this.addPanel();

    this.addCommands();

  }

  addPanel() {
    this.editor.Panels.addPanel({
      id: 'panel-top',
      el: '.panel__top',
    });

    this.editor.Panels.addPanel({
      id: 'basic-actions',
      el: '.panel__basic-actions',
      buttons: [
        {
          id: 'visibility',
          active: true, // active by default
          className: 'btn-toggle-borders',
          label: '<u>B</u>',
          command: 'sw-visibility', // Built-in command
        }, {
          id: 'export',
          className: 'btn-open-export',
          label: 'Exp',
          command: 'export-template',
          context: 'export-template', // For grouping context of buttons from the same panel
        }, {
          id: 'show-json',
          className: 'btn-show-json',
          label: 'JSON',
          context: 'show-json',
          command(editor) {
            editor.Modal.setTitle('Components JSON')
              .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
              .open();
          },
        }
      ],
    });
  }

  addCommands() {
    this.editor.Commands.add('show-layers', {
      getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
      getLayersEl(row) { return row.querySelector('.layers-container') },

      run(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = '';
      },
      stop(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = 'none';
      },
    });

    this.editor.Commands.add('show-styles', {
      getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
      getStyleEl(row) { return row.querySelector('.styles-container') },

      run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = '';
      },
      stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = 'none';
      },
    });

    this.editor.Commands.add('show-traits', {
      getTraitsEl(editor) {
        const row = editor.getContainer().closest('.editor-row');
        return row.querySelector('.traits-container');
      },
      run(editor, sender) {
        this.getTraitsEl(editor).style.display = '';
      },
      stop(editor, sender) {
        this.getTraitsEl(editor).style.display = 'none';
      },
    });

    // Desktop görünümü.
    this.editor.Commands.add('set-device-desktop', {
      run: editor => editor.setDevice('Desktop')
    });

    // Mobile görünümü.
    this.editor.Commands.add('set-device-mobile', {
      run: editor => editor.setDevice('Mobile')
    });

    // Save.
    this.editor.Commands.add('save', editor => {
      console.log(editor.getHtml());
      console.log(editor.getCss());
    });

  }
}
