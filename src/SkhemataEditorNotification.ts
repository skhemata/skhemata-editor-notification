import { html, SkhemataBase, property, CSSResult, css } from '@skhemata/skhemata-base';
import Quill from 'quill';
import { Snow } from './Snow';

export class SkhemataEditorNotification extends SkhemataBase {
  
  @property({ type: Element }) 
  quill: any = null;

  @property({ type: String }) 
  htmlValue = '';
 
  @property({ type: Number }) 
  editorId = 0;


  @property({ type: Function })
  changeText: (newText: string, id: number) => void;

  static get styles() {
    return <CSSResult[]> [
      Snow,
      css`
      .ql-editor {
        height: 250px;
      }
      `
    ];
  }


  async firstUpdated(){
    super.firstUpdated();
    
    if(this.shadowRoot){
      const element = <Element>this.shadowRoot?.getElementById('editor');

      if(element){
        this.quill = new Quill(element, {
          modules: { 
            toolbar: {
              container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
              ],
              handlers: {}
            }         
          },
    
          theme: 'snow',
        });

        const newContent = this.quill.clipboard.convert(this.htmlValue)
        this.quill.setContents(newContent);
    
        this.quill.on('text-change', () => {
          this.changeText(`${this.quill.root.innerHTML}`, this.editorId);
        })

      }
    }
  }

  render() {
    return html`
    
      <div id="editor"></div>
    `;
  }
}
