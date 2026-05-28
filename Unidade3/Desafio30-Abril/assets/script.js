const live = document.querySelector('#live-region');
const toast = document.querySelector('#toast');

let toastTimer;

function announce(message) {
  if (live) live.textContent = message;

  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }
}

window.announce = announce;

const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('#mobile-nav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    announce(open ? 'Menu aberto' : 'Menu fechado');
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const a11yToggle = document.querySelector('#a11y-toggle');
const a11yPanel = document.querySelector('#a11y-panel');

if (a11yToggle && a11yPanel) {
  a11yToggle.addEventListener('click', () => {
    const open = a11yPanel.classList.toggle('open');

    a11yToggle.setAttribute('aria-expanded', String(open));
    a11yPanel.setAttribute('aria-hidden', String(!open));

    if (open) a11yPanel.querySelector('button')?.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && a11yPanel.classList.contains('open')) {
      a11yPanel.classList.remove('open');
      a11yToggle.setAttribute('aria-expanded', 'false');
      a11yPanel.setAttribute('aria-hidden', 'true');
      a11yToggle.focus();
    }
  });

  document.querySelectorAll('[data-a11y]').forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.dataset.a11y;

      if (type === 'text') {
        document.body.classList.toggle('text-lg');
        announce(document.body.classList.contains('text-lg') ? 'Texto aumentado' : 'Texto em tamanho padrão');
      }

      if (type === 'contrast') {
        document.body.classList.toggle('contrast');
        announce(document.body.classList.contains('contrast') ? 'Alto contraste ativado' : 'Alto contraste desativado');
      }

      if (type === 'motion') {
        document.body.classList.toggle('motion-off');
        announce(document.body.classList.contains('motion-off') ? 'Movimento reduzido' : 'Movimento restaurado');
      }

      if (type === 'reset') {
        document.body.classList.remove('text-lg', 'contrast', 'motion-off');
        announce('Preferências restauradas');
      }
    });
  });
}

document.addEventListener('keydown', (event) => {
  if (event.altKey && event.key === '1') {
    document.querySelector('main')?.focus?.();
    document.querySelector('main')?.scrollIntoView();
    announce('Indo para o conteúdo principal');
  }

  if (event.altKey && event.key === '2') {
    document.querySelector('#search')?.focus();
    announce('Busca ativada');
  }

  if (event.altKey && event.key === '3') {
    document.querySelector('.topbar')?.scrollIntoView();
    announce('Indo para o menu');
  }
});

const vueCardapio = document.querySelector('#vue-cardapio');

if (vueCardapio && window.Vue) {
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        searchTerm: '',
        currentFilter: 'todos',
        order: [],

        categories: [
          { label: 'Todos', value: 'todos' },
          { label: 'Tradicionais', value: 'tradicionais' },
          { label: 'Especiais', value: 'especiais' },
          { label: 'Doces', value: 'doces' }
        ],

        menuCategories: [
          { title: 'Pizzas tradicionais', value: 'tradicionais' },
          { title: 'Pizzas especiais', value: 'especiais' },
          { title: 'Pizzas doces', value: 'doces' }
        ],

        products: [
          {
            id: 1,
            name: 'Pizza Calabresa',
            description: 'Molho, mussarela, calabresa fatiada, cebola e orégano.',
            price: 'R$ 45,00',
            image: 'assets/pizzas/calabresa.webp',
            alt: 'Pizza de calabresa com cebola',
            category: 'tradicionais',
            chip: 'Clássica',
            highlight: false,
            search: 'pizza calabresa mussarela cebola oregano molho tomate'
          },
          {
            id: 2,
            name: 'Pizza Mussarela',
            description: 'Molho de tomate, mussarela especial e orégano.',
            price: 'R$ 40,00',
            image: 'assets/pizzas/mussarela.webp',
            alt: 'Pizza de mussarela',
            category: 'tradicionais',
            chip: 'Tradicional',
            highlight: false,
            search: 'pizza mussarela queijo molho tomate oregano muçarela'
          },
          {
            id: 3,
            name: 'Pizza Margherita',
            description: 'Mussarela, tomate fresco, manjericão e molho da casa.',
            price: 'R$ 42,00',
            image: 'assets/pizzas/margherita.webp',
            alt: 'Pizza Margherita com tomate e manjericão',
            category: 'tradicionais',
            chip: 'Leve',
            highlight: false,
            search: 'pizza margherita mussarela tomate manjericao manjericão molho'
          },
          {
            id: 4,
            name: 'Pizza Milho',
            description: 'Mussarela, milho verde, molho de tomate e orégano.',
            price: 'R$ 43,00',
            image: 'assets/pizzas/milho.webp',
            alt: 'Pizza de milho',
            category: 'tradicionais',
            chip: 'Suave',
            highlight: false,
            search: 'pizza milho mussarela milho verde oregano'
          },
          {
            id: 5,
            name: 'À Moda do Rei',
            description: 'Uma combinação generosa de ingredientes selecionados, no padrão da casa.',
            price: 'R$ 56,00',
            image: 'assets/pizzas/a-moda-do-rei.webp',
            alt: 'Pizza À Moda do Rei',
            category: 'especiais',
            chip: 'Da casa',
            highlight: true,
            search: 'pizza a moda do rei especial presunto milho cebola tomate'
          },
          {
            id: 6,
            name: 'Calabresa Especial',
            description: 'Calabresa, mussarela, cebola roxa, catupiry e orégano.',
            price: 'R$ 54,00',
            image: 'assets/pizzas/calabresa-especial.webp',
            alt: 'Pizza Calabresa Especial',
            category: 'especiais',
            chip: 'Mais pedida',
            highlight: true,
            search: 'pizza calabresa especial calabresa cebola catupiry mussarela'
          },
          {
            id: 7,
            name: 'Quatro Queijos',
            description: 'Mussarela, parmesão, gorgonzola e catupiry cremoso.',
            price: 'R$ 48,00',
            image: 'assets/pizzas/4-queijos.webp',
            alt: 'Pizza quatro queijos',
            category: 'especiais',
            chip: 'Cremosa',
            highlight: false,
            search: 'pizza quatro queijos mussarela parmesao gorgonzola catupiry'
          },
          {
            id: 8,
            name: 'Frango, Cheddar e Bacon',
            description: 'Frango desfiado, cheddar cremoso, bacon crocante e mussarela.',
            price: 'R$ 58,00',
            image: 'assets/pizzas/frango-cheddar-bacon.webp',
            alt: 'Pizza de frango com cheddar e bacon',
            category: 'especiais',
            chip: 'Especial',
            highlight: false,
            search: 'pizza frango cheddar bacon mussarela'
          },
          {
            id: 9,
            name: 'Pizza Califórnia',
            description: 'Sabor especial para quem gosta de combinações marcantes e diferentes.',
            price: 'R$ 55,00',
            image: 'assets/pizzas/california.webp',
            alt: 'Pizza Califórnia',
            category: 'especiais',
            chip: 'Especial',
            highlight: false,
            search: 'pizza california califórnia especial doce salgada frutas'
          },
          {
            id: 10,
            name: 'Chocolate',
            description: 'Massa da casa com cobertura cremosa de chocolate.',
            price: 'R$ 39,00',
            image: 'assets/pizzas/chocolate.webp',
            alt: 'Pizza doce de chocolate',
            category: 'doces',
            chip: 'Doce',
            highlight: false,
            search: 'pizza doce chocolate sobremesa chocolate raspas'
          },
          {
            id: 11,
            name: 'Doce de Leite com Banana',
            description: 'Doce de leite, banana e canela para finalizar o pedido.',
            price: 'R$ 41,00',
            image: 'assets/pizzas/doce-de-leite-banana.webp',
            alt: 'Pizza doce de leite com banana',
            category: 'doces',
            chip: 'Doce',
            highlight: false,
            search: 'pizza doce leite banana canela sobremesa'
          }
        ]
      };
    },

    computed: {
      filteredProducts() {
        const term = this.normalizeText(this.searchTerm);

        return this.products.filter((product) => {
          const matchesCategory =
            this.currentFilter === 'todos' || product.category === this.currentFilter;

          const searchableText = this.normalizeText(
            `${product.name} ${product.description} ${product.search}`
          );

          const matchesSearch = !term || searchableText.includes(term);

          return matchesCategory && matchesSearch;
        });
      },

      groupedProducts() {
        return this.menuCategories
          .map((category) => ({
            ...category,
            products: this.filteredProducts.filter(
              (product) => product.category === category.value
            )
          }))
          .filter((category) => category.products.length > 0);
      },

      whatsappUrl() {
        const baseUrl = 'https://api.whatsapp.com/send?phone=5561981579252&text=';

        const message = this.order.length
          ? `Olá! Gostaria de fazer o pedido:\n- ${this.order.map((item) => item.name).join('\n- ')}`
          : 'Olá! Gostaria de fazer um pedido.';

        return baseUrl + encodeURIComponent(message);
      }
    },

    methods: {
      normalizeText(text) {
        return String(text)
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      },

      setFilter(filter) {
        this.currentFilter = filter;
        this.announceResults();
      },

      addToCart(product) {
        this.order.push(product);
        announce(`${product.name} adicionado ao pedido.`);
      },

      announceResults() {
        this.$nextTick(() => {
          const total = this.filteredProducts.length;
          const message = `${total} produto${total === 1 ? '' : 's'} encontrado${total === 1 ? '' : 's'}.`;
          announce(message);
        });
      }
    }
  }).mount('#vue-cardapio');
}