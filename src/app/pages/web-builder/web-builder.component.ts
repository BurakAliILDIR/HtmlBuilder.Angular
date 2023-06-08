import { Component, OnInit, } from '@angular/core';
import grapesjs from 'grapesjs';
import { ActivatedRoute } from '@angular/router';
import { BaseResponse } from 'src/app/_models/base-response.model';
import { PageModel } from 'src/app/_models/page.model';
import { UpdatePageRequest } from 'src/app/_requests/page.request';
import { PageService } from 'src/app/_services/page.service';
import { ComponentModel } from 'src/app/_models/component.model';
import { Blocks } from './web-builder.block';

@Component({
  selector: 'app-web-builder',
  templateUrl: './web-builder.component.html',
  styleUrls: ['./web-builder.component.css']
})
export class WebBuilderComponent implements OnInit {

  public editor: any = null

  page: PageModel;
  blocks: object[] = [
    ...Blocks
  ];

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.initGrapesJS();

    this.activatedRoute.data?.subscribe(({ findPage }) => {
      this.page = findPage.data
      this.editor.setComponents(this.page.html);
      this.editor.setStyle(this.page.css);
    });

    this.activatedRoute.data?.subscribe(({ getComponents }) => {
      const components = getComponents.data
      this.blocks.forEach(x => components.push(x))
      this.editor.BlockManager.render(components)
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
            buildProps: ['width', 'height', 'min-height', 'padding'],
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
        blocks: this.blocks
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

      let request = new UpdatePageRequest;

      request.id = this.page.id;
      request.html = editor.getHtml();
      request.css = editor.getCss();

      this.pageService.updatePage(request).subscribe({
        next: (value: BaseResponse) => {
          console.log(value);
        },
        complete: () => console.log("completed..")
      });
    });

  }
}
