import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchSuggestions.tpl.html';
import { Component } from '../component';

const data = [
  'чехол iphone 13 pro',
  'коляски agex',
  'яндекс станция 2',
]

class SearchSuggestions extends Component  {  
  view: View;

  constructor( props: any ) {
    super(props);
    this.view = new ViewTemplate(html).cloneView();
  }

    renderSuggestions(data: string[]) {

        const createElement = (tag: string, className: string, text?: string) => {
            const item = document.createElement(tag);
            item.className = className;
            item.innerText = text || "";
            return item;
        };

        data.forEach((suggestionName, index) => {
            const suggestionElem = createElement('div', 'searchSuggestions__list__item');
            suggestionElem.appendChild(createElement('span', 'searchSuggestions__list__item_text', suggestionName));
            suggestionElem.addEventListener('click', () => {
              this.view.inputSearch.value = suggestionName
            })
            this.view.searchSuggestions__list.appendChild(suggestionElem);
            
            if (index === 0 && index !== data.length - 1) {
              this.view.searchSuggestions__list.appendChild(createElement('span', 'searchSuggestions__list__item_textStatic', ','));
            } 

            if (index === 1 && index !== data.length - 1) {
              this.view.searchSuggestions__list.appendChild(createElement('span', 'searchSuggestions__list__item_textStatic lastTextStatic', 'или'));
            }
        });

        return this.view.searchSuggestions__list;
    }

    attach($root: HTMLElement) {
      $root.innerHTML = '';
      $root.appendChild(this.view.root);
    }

    render() {
      this.renderSuggestions(data);
    }
}

export default new SearchSuggestions(html);