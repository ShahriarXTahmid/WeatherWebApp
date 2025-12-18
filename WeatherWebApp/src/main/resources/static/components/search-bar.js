class CustomSearchBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Styles (Tailwind is global; keep minimal native styles for layout in shadow DOM)
    const style = document.createElement('style');
    style.textContent = `
      .wrapper { display: flex; gap: 0.5rem; justify-content: center; }
      input {
        padding: 0.75rem 1rem;
        border-radius: 9999px;
        border: 1px solid rgba(255,255,255,0.5);
        outline: none;
        min-width: 240px;
        background: rgba(255,255,255,0.85);
        color: #000;               /* Make input text black */
        caret-color: #000;         /* Black text cursor */
      }
      input::placeholder { color: rgba(0,0,0,0.6); }
      input::-webkit-input-placeholder { color: rgba(0,0,0,0.6); }
      input::-moz-placeholder { color: rgba(0,0,0,0.6); }
      input:-ms-input-placeholder { color: rgba(0,0,0,0.6); }
      input:-moz-placeholder { color: rgba(0,0,0,0.6); }
      button {
        padding: 0.75rem 1rem;
        border-radius: 9999px;
        border: none;
        background: #3b82f6;
        color: white;
        cursor: pointer;
      }
      button:hover { filter: brightness(1.05); }
    `;

    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Search city...';
    this.input.setAttribute('aria-label', 'Search city');

    const button = document.createElement('button');
    button.textContent = 'Search';

    wrapper.appendChild(this.input);
    wrapper.appendChild(button);
    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    // Events
    const submit = () => {
      const city = (this.input.value || '').trim();
      if (!city) return;
      this.dispatchEvent(
        new CustomEvent('citySearched', {
          bubbles: true,
          composed: true,
          detail: { city }
        })
      );
    };

    button.addEventListener('click', submit);
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit();
    });
  }
}

customElements.define('custom-search-bar', CustomSearchBar);
