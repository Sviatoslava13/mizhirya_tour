document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('#menu-toggle');
    const burgerButton = document.querySelector('.burger');
    const navActions = document.querySelectorAll('.nav__link, .nav__booking');
    const heroVideo = document.querySelector('.hero__video');

    function loadHeroVideo() {
      if (!heroVideo || heroVideo.dataset.loaded === 'true') return;

      const sources = heroVideo.querySelectorAll('source[data-src]');
      sources.forEach((source) => {
        source.src = source.dataset.src;
        source.removeAttribute('data-src');
      });

      heroVideo.dataset.loaded = 'true';
      heroVideo.load();
      heroVideo.play().catch(() => {});
    }

    window.addEventListener('load', () => {
      window.requestIdleCallback
        ? window.requestIdleCallback(loadHeroVideo, { timeout: 1500 })
        : setTimeout(loadHeroVideo, 800);
    });

    function setMenuState(isOpen) {
      if (burgerButton) {
        burgerButton.setAttribute('aria-expanded', String(isOpen));
        burgerButton.setAttribute(
          'aria-label',
          isOpen ? 'Закрити меню' : 'Відкрити меню'
        );
      }
    }

    if (menuToggle) {
      setMenuState(menuToggle.checked);

      menuToggle.addEventListener('change', () => {
        setMenuState(menuToggle.checked);
      });
    }

    if (burgerButton && menuToggle) {
      burgerButton.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        menuToggle.checked = !menuToggle.checked;
        setMenuState(menuToggle.checked);
      });
    }

    navActions.forEach((link) => {
      link.addEventListener('click', () => {
        if (menuToggle) {
          menuToggle.checked = false;
          setMenuState(false);
        }
      });
    });

    const routeDetails = {
      'pysanyi-kamin': {
        title: 'Писаний Камінь',
        image: 'img/kamin_p.JPG',
        text: 'Місце сили серед карпатських скель із давніми написами та широкими панорамами. Маршрут підійде для красивих фото, спокійної прогулянки й першого знайомства з гірськими краєвидами.'
      },
      krynta: {
        title: 'Полонина Кринта',
        image: 'img/krynta-meadow.jpg',
        text: 'На Полонині Кринта є сироварня, де можна побачити місцеві традиції та скуштувати справжні карпатські сири, бринзу й інші гуцульські смаколики. Також тут можна зробити фото на фоні гірських хребтів і відпочити в тиші полонини.'
      },
      bendzhola: {
        title: 'Гора Бенджола',
        image: 'img/bendzhola-mountain.jpg',
        text: 'Дорогою на Гору Бенджола ви відвідаєте ще одну цікаву локацію — Гуцульські Гринди. Там є розваги для дітей, а також колиба, де можна відпочити, поїсти й провести час у затишній атмосфері Карпат.'
      },
      'bila-kobyla': {
        title: 'Гора Біла Кобила',
        image: 'img/horse.JPG',
        text: 'Маршрут веде на відкритий трав’янистий хребет із панорамами Чорногори та Гриняви. Це гарний варіант для тих, хто хоче побачити простір Карпат, відчути висоту й повернутися з яскравими фото.'
      },
      psarivka: {
        title: 'Полонина Псарівка',
        image: 'img/psarivka-meadow.png',
        text: 'Полонина Псарівка відкриває справжній дух гір: зелені схили, тиша, традиційне пастуше життя та краєвиди, які добре підходять для спокійного сімейного відпочинку.'
      },
      snidavka: {
        title: 'Снідавка',
        image: 'img/snidavka.png',
        text: 'Під час туру до Снідавки можна відвідати ще одну відому локацію — Терношорську Ладу. Це особливе місце з символічною атмосферою, красивими краєвидами та відчуттям спокою серед карпатської природи.'
      },
      pamir: {
        title: 'Памір — гора Томнатик',
        image: 'img/pamir.JPG',
        text: 'Памір славиться білими куполами колишньої радіолокаційної станції на горі Томнатик. Це складний високогірний маршрут із лісовими підйомами, відкритими хребтами та масштабними панорамами Буковинських Карпат. Сюди їдуть не лише за природою, а й за незвичною атмосферою місця, яке виглядає майже космічно.'
      },
      maksymets: {
        title: 'Полонина Максимець',
        image: 'img/maksymets.jpeg',
        text: 'Полонина Максимець славиться фотозонами та гойдалками над горами: є гойдалка 360 градусів, ще одна велика гойдалка та інші місця для красивих фото. Це складний маршрут із гірськими дорогами, відкритими краєвидами та відчуттям висоти, тому він добре підходить для тих, хто хоче більше вражень і драйву.'
      },
      kostrycha: {
        title: 'Полонина Кострича',
        image: 'img/kostrich.jpg',
        text: 'Полонина Кострича відома своїми видами на Чорногірський хребет, зеленими полонинами та спокійною атмосферою високих Карпат. Маршрут цінують за простір, тишу, свіже повітря та можливість побачити гори без поспіху. Це гарний варіант для фото, прогулянки й відпочинку від міського шуму.'
      },
      burkut: {
        title: 'Буркут',
        image: 'img/burkut.jpeg',
        text: 'Буркут славиться своєю водою та джерелами, заради яких сюди приїжджають гості. Маршрут проходить через лісові дороги й атмосферні гірські місця, де можна зупинитися, набрати води, зробити фото та відпочити серед природи. Це не просто краєвиди, а локація з характером і власною історією.'
      }
    };
    const hotelModalDelay = 30000;
    let hotelModalShown = false;

    const modal = document.querySelector('#route-modal');
    const modalTitle = modal?.querySelector('.route-modal__title');
    const modalText = modal?.querySelector('.route-modal__text');
    const modalImage = modal?.querySelector('.route-modal__image');
    const modalButtons = document.querySelectorAll('[data-route-modal]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');

    function closeModal() {
      if (!modal) return;

      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('inert', '');
      document.body.classList.remove('modal-open');
    }

    modalButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const route = routeDetails[button.dataset.routeModal];

        if (!modal || !route || !modalTitle || !modalText || !modalImage) return;

        modalTitle.textContent = route.title;
        modalText.textContent = route.text;
        modalImage.src = route.image;
        modalImage.alt = route.title;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        modal.removeAttribute('inert');
        document.body.classList.add('modal-open');
      });
    });

    closeButtons.forEach((button) => {
      button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
        closeHotelModal();
      }
    });

    const hotelModal = document.querySelector('#hotel-modal');
    const hotelCloseButtons = document.querySelectorAll('[data-hotel-close]');

    function closeHotelModal() {
      if (!hotelModal) return;

      hotelModal.classList.remove('is-open');
      hotelModal.setAttribute('aria-hidden', 'true');
      hotelModal.setAttribute('inert', '');
      document.body.classList.remove('modal-open');
    }

    function openHotelModal() {
      if (!hotelModal || hotelModalShown) return;

      if (modal?.classList.contains('is-open')) {
        setTimeout(openHotelModal, 15000);
        return;
      }

      hotelModalShown = true;
      hotelModal.classList.add('is-open');
      hotelModal.setAttribute('aria-hidden', 'false');
      hotelModal.removeAttribute('inert');
      document.body.classList.add('modal-open');
    }

    hotelCloseButtons.forEach((button) => {
      button.addEventListener('click', closeHotelModal);
    });

    window.addEventListener('load', () => {
      setTimeout(openHotelModal, hotelModalDelay);
    });

    const track = document.querySelector('.cars__track');
    if (!track) return;
  
    const images = track.querySelectorAll('.cars__image');
    if (images.length <= 1) return;
  
    const firstClone = images[0].cloneNode(true);
    track.appendChild(firstClone);
  
    let currentIndex = 0;
    const intervalTime = 3000;
    const slideCount = images.length; 
  
    function nextSlide() {
      currentIndex++;
      
      track.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
      track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
  
      if (currentIndex === slideCount) {
        setTimeout(() => {
          track.style.transition = 'none';
          currentIndex = 0;
          track.style.transform = `translate3d(0, 0, 0)`;
        }, 800); 
      }
    }

    setInterval(nextSlide, intervalTime);
  });
