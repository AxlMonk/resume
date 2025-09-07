import { getPage } from "./src/pages/page.js";
import './src/pages/a.css';

getPage();

const mainNavList = document.getElementById('mainNavList');
const mainNavItems = mainNavList.querySelectorAll('li');

mainNavItems.forEach(item => {
  item.addEventListener('click', function() {
    mainNavItems[0].classList.add('activated');
    mainNavItems.forEach(li => li.classList.remove('activated'));
    this.classList.add('activated');
  });
});

